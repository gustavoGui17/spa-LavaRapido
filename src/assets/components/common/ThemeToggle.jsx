import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../../../contexts/ThemeContext";

const ToggleWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-white);
  color: var(--color-dark);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .color-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid var(--color-border);
    flex-shrink: 0;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 8px;
  z-index: 100;
  min-width: 160px;
  animation: fadeIn 0.15s ease;
`;

const fadeIn = styled.div`
  animation: fadeIn 0.15s ease;
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: ${({ active }) => (active ? "var(--color-light)" : "transparent")};
  color: var(--color-dark);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-light);
  }

  .dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--color-border);
  margin: 4px 0;
`;

const DarkToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-dark);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-light);
  }
`;

const SwitchTrack = styled.div`
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: ${({ active }) => (active ? "var(--color-primary)" : "var(--color-border)")};
  position: relative;
  transition: background 0.2s ease;
`;

const SwitchThumb = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 2px;
  left: ${({ active }) => (active ? "18px" : "2px")};
  transition: left 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export default function ThemeToggle() {
  const { themeName, changeTheme, isDark, toggleDark, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = themes[themeName];

  return (
    <ToggleWrapper ref={ref}>
      <ToggleButton onClick={() => setOpen(!open)}>
        <span className="color-dot" style={{ background: current.color }} />
        {current.label}
      </ToggleButton>

      {open && (
        <Dropdown>
          {Object.entries(themes).map(([key, t]) => (
            <ThemeOption
              key={key}
              active={themeName === key}
              onClick={() => {
                changeTheme(key);
                setOpen(false);
              }}
            >
              <span className="dot" style={{ background: t.color }} />
              {t.label}
            </ThemeOption>
          ))}
          <Divider />
          <DarkToggle onClick={toggleDark}>
            <span>{isDark ? "Modo claro" : "Modo escuro"}</span>
            <SwitchTrack active={isDark}>
              <SwitchThumb active={isDark} />
            </SwitchTrack>
          </DarkToggle>
        </Dropdown>
      )}
    </ToggleWrapper>
  );
}
