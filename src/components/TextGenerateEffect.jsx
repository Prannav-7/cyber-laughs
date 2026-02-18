import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TextGenerateEffect
 * Animates each word in `words` fading in one by one with a blur-to-clear effect.
 * Uses GSAP ScrollTrigger so it works correctly on page refresh and respects scroll position.
 *
 * Props:
 *  words       – string of text to animate
 *  duration    – seconds each word takes to fade in (default 0.8)
 *  filter      – whether to animate a blur filter (default true)
 *  stagger     – seconds between each word (default 0.12)
 *  className   – extra classes on the wrapper span
 *  wordClass   – extra classes on each word span
 *  delay       – initial delay before animation starts (default 0)
 *  triggerStart– ScrollTrigger start position (default 'top 88%')
 *  heroMode    – if true, skip ScrollTrigger and use a plain delay (for above-fold content)
 */
const TextGenerateEffect = ({
    words = '',
    duration = 0.8,
    filter = true,
    stagger = 0.12,
    className = '',
    wordClass = '',
    delay = 0,
    triggerStart = 'top 88%',
    heroMode = false,
}) => {
    const containerRef = useRef(null);

    const wordList = words.trim().split(/\s+/);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const spans = Array.from(container.querySelectorAll('.tge-word'));
        if (!spans.length) return;

        // Set initial hidden state immediately (synchronous)
        gsap.set(spans, {
            opacity: 0,
            filter: filter ? 'blur(10px)' : 'none',
            y: 8,
        });

        let st;

        if (heroMode) {
            // Hero is above the fold — just use a delay, no scroll trigger needed
            gsap.to(spans, {
                opacity: 1,
                filter: filter ? 'blur(0px)' : 'none',
                y: 0,
                duration,
                stagger,
                ease: 'power2.out',
                delay,
            });
        } else {
            // Below-fold content — use ScrollTrigger so it works on refresh
            st = ScrollTrigger.create({
                trigger: container,
                start: triggerStart,
                once: true,
                onEnter: () => {
                    gsap.to(spans, {
                        opacity: 1,
                        filter: filter ? 'blur(0px)' : 'none',
                        y: 0,
                        duration,
                        stagger,
                        ease: 'power2.out',
                        delay,
                    });
                },
            });
        }

        return () => {
            if (st) st.kill();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <span ref={containerRef} className={`inline ${className}`}>
            {wordList.map((word, i) => (
                <span
                    key={i}
                    className={`tge-word inline-block ${wordClass}`}
                    style={{ marginRight: '0.3em', willChange: 'opacity, filter, transform' }}
                >
                    {word}
                </span>
            ))}
        </span>
    );
};

export default TextGenerateEffect;
