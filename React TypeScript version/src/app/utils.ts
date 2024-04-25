import { useEffect, useState } from "react";

interface CodeGenerator {
  (): string;
  value?: number;
}

const generateCode: CodeGenerator = () => {
  const code = generateCode.value
    ? ++generateCode.value
    : (generateCode.value = 1);
  return code.toString();
};

const isPatternPassed = (text: string) =>
  text.trim().length && text.length < 30 ? true : false;

export { generateCode, isPatternPassed };
