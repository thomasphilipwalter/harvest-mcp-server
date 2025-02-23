declare module 'chrono-node' {
  interface ParsedResult {
    start: {
      date: () => Date;
    };
    end?: {
      date: () => Date;
    };
  }

  export function parse(text: string): ParsedResult[];
  export function parseDate(text: string): Date | null;
}
