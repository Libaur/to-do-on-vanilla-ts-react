interface CodeGenerator {
  (): string;
  value?: number;
}

export const generateCode: CodeGenerator = () => {
  const code = generateCode.value ? ++generateCode.value : (generateCode.value = 1);
  return code.toString();
};

export const isPatternPassed = (text: string) =>
  text.trim().length && text.length < 30 ? true : false;
