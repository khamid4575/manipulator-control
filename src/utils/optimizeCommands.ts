export const optimizeCommands = (commands: string): string => {
  let result = '';
  let count = 1;
  let current = commands[0];

  for (let i = 1; i <= commands.length; i++) {
    if (commands[i] === current) {
      count++;
    } else {
      result += count > 1 ? `${count}${current}` : current;
      current = commands[i];
      count = 1;
    }
  }

  const patternMatch = result.match(/^((\d+[LN])+\d+[LN])(\1)*([OB])$/);
  if (patternMatch) {
    const pattern = patternMatch[1];
    const repeatCount = (result.match(new RegExp(pattern, 'g')) || []).length;
    if (repeatCount > 1) {
      return `${repeatCount}(${pattern})${patternMatch[3]}`;
    }
  }

  return result;
};