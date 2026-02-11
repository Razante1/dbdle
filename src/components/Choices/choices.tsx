import { useEffect, useRef } from "react";
import { ChoicesProps } from "../../interface/ChoicesProps";
import "./choices.css"
export function Choices({ choices, personagem }: ChoicesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [choices]);

  function compareField(choiceValue: any, personagemValue: any) {
    // Sem personagem base
    if (personagemValue === undefined || personagemValue === null) {
      return { color: "#333", arrow: null };
    }

    // Comparação numérica
    if (typeof choiceValue === "number" && typeof personagemValue === "number") {
      if (choiceValue < personagemValue) {
        return { color: "#F44336", arrow: "⬆" };
      }
      if (choiceValue > personagemValue) {
        return { color: "#F44336", arrow: "⬇" };
      }
      return { color: "#4CAF50", arrow: null };
    }

    // Comparação padrão
    if (choiceValue === personagemValue) {
      return { color: "#4CAF50", arrow: null };
    }

    return { color: "#F44336", arrow: null };
  }

return (
  <div className="choices-wrapper">
    {choices && choices.length > 0 && (
      <div ref={scrollRef} className="choices-scroll-area">
        {choices.map((obj, index) => (
          <div key={index} className="choices-row">
            {Object.entries(obj).map(([key, value]) => {
              if (key === "image" || key === "description") return null;

              const personagemValue =
                personagem?.[key as keyof typeof obj];

              const { color, arrow } = compareField(
                value,
                personagemValue
              );

              return (
                <div
                  key={key}
                  className="choice-card"
                  style={{ backgroundColor: color }}
                >
                  <span className="choice-label">
                    {key}
                  </span>

                  <span className="choice-value">
                    {Array.isArray(value) ? value[0] : String(value)} {arrow}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    )}
  </div>
);

}
