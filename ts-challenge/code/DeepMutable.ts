/**
 * @author cc-heart
 * @Date 2022-12-20
 * @Number 17973
 * @see https://github.com/cc-hearts/type-challenges/blob/main/questions/17973-medium-deepmutable/README.md
 */
import { Equal, Expect } from "../utils";

type DeepMutable<T extends Record<string, any>> = T extends Record<string, any>
  ? {
      -readonly [k in keyof T]: T[k] extends Record<string, any>
        ? T[k] extends (...args: any[]) => any
          ? T[k]
          : DeepMutable<T[k]>
        : T[k];
    }
  : T;

interface Test1 {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly meta: {
    readonly author: string;
  };
}
type Test2 = {
  readonly a: () => 1;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "s";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};
interface DeepMutableTest1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

type DeepMutableTest2 = {
  a: () => 1;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "s";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type cases = [
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>
];

type errors = [
  // @ts-expect-error
  DeepMutable<"string">,
  // @ts-expect-error
  DeepMutable<0>
];
