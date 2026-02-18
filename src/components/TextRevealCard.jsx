import { useRef, useState, useCallback } from 'react';

/**
 * TextRevealCard
 * Hover over the card to reveal hidden text via a mouse-tracking spotlight.
 *
 * Props:
 *  text        – the text shown by default (dimmed)
 *  revealText  – the text revealed under the spotlight on hover
 *  children    – optional title / description rendered above
 *  className   – extra classes on the card wrapper
 */
export const TextRevealCard = ({
    text = '',
    revealText = '',
    children,
    className = '',
}) => {
    const cardRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleMouseEnter = useCallback(() => setIsHovering(true), []);
    const handleMouseLeave = useCallback(() => setIsHovering(false), []);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`text-reveal-card ${className}`}
            style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'none',
                userSelect: 'none',
            }}
        >
            {/* Optional children (title / description) */}
            {children && (
                <div className="text-reveal-card__header">
                    {children}
                </div>
            )}

            {/* Text layer stack */}
            <div style={{ position: 'relative' }}>

                {/* ── Bottom layer: revealText (always rendered, clipped by spotlight) ── */}
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        // Radial clip-path follows the mouse
                        WebkitMaskImage: isHovering
                            ? `radial-gradient(circle 220px at ${position.x}px ${position.y}px, black 0%, transparent 100%)`
                            : 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 100%)',
                        maskImage: isHovering
                            ? `radial-gradient(circle 220px at ${position.x}px ${position.y}px, black 0%, transparent 100%)`
                            : 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 100%)',
                        transition: isHovering ? 'none' : '-webkit-mask-image 0.4s ease, mask-image 0.4s ease',
                        zIndex: 2,
                    }}
                >
                    <TextRevealCardTitle asReveal>
                        {revealText}
                    </TextRevealCardTitle>
                </div>

                {/* ── Top layer: default text (dimmed) ── */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <TextRevealCardTitle>
                        {text}
                    </TextRevealCardTitle>
                </div>
            </div>
        </div>
    );
};

/**
 * TextRevealCardTitle
 * Renders the large display title text.
 * Pass asReveal=true for the accent-colored reveal layer.
 */
export const TextRevealCardTitle = ({ children, asReveal = false, className = '' }) => (
    <div
        className={`text-reveal-card__title ${className}`}
        style={{
            fontFamily: 'var(--font-display, "Bebas Neue", sans-serif)',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: asReveal ? 'var(--accent)' : 'rgba(240,234,216,0.15)',
            whiteSpace: 'pre-line',
            padding: '0',
        }}
    >
        {children}
    </div>
);

/**
 * TextRevealCardDescription
 * Small subtitle text below the title.
 */
export const TextRevealCardDescription = ({ children, className = '' }) => (
    <p
        className={`text-reveal-card__desc ${className}`}
        style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '0.75rem',
        }}
    >
        {children}
    </p>
);

export default TextRevealCard;
