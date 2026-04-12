/** Общие пропсы для шагов регистрации (каждый шаг использует своё подмножество). */
export type RegisterFormStepProps = {
  submitError: string | null;
  onGoNext: () => void | Promise<void>;
  submitting: boolean;
  onBack: () => void;
};
