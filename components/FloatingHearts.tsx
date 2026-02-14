
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Casting motion.div to any to bypass type compatibility issues in the environment
const MotionDiv = motion.div as any;

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; scale: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 1,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <MotionDiv
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            fontSize: `${heart.scale * 2}rem`,
            color: 'rgba(255, 100, 120, 0.4)',
          }}
        >
          ❤️
        </MotionDiv>
      ))}
    </div>
  );
};

export default FloatingHearts;
