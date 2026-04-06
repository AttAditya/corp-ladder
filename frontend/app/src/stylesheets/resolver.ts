type DeclarationValue = number | string;

interface StyleRule {
  declarations: Record<string, DeclarationValue>;
  media?: string;
  selector: string;
}

function formatDeclarationValue(value: DeclarationValue): string {
  return typeof value === "number" ? `${value}px` : value;
}

export function resolveStylesheet(rules: StyleRule[]): string {
  return rules.map((rule) => {
    const declarationBlock = Object.entries(rule.declarations)
      .map(([property, value]) => `  ${property}: ${formatDeclarationValue(value)};`)
      .join("\n");

    const cssRule = `${rule.selector} {\n${declarationBlock}\n}`;
    return rule.media ? `${rule.media} {\n${cssRule}\n}` : cssRule;
  }).join("\n\n");
}
