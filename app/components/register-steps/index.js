// Components
import RegisterStep1 from './register-step-1';
import RegisterStep2 from './register-step-2';
import RegisterStep3 from './register-step-3';
import RegisterStep4 from './register-step-4';
import RegisterStep5 from './register-step-5';
import RegisterStep6 from './register-step-6';

const RegisterSteps = ({ step, next, previous, cancel }) => {
  switch (step) {
    case 1:
      return (
        <RegisterStep2
          nextStep={() => next()}
          previousStep={() => previous()}
        />
      );
    case 2:
      return (
        <RegisterStep3
          nextStep={() => next()}
          previousStep={() => previous()}
        />
      );
    case 3:
      return (
        <RegisterStep4
          nextStep={() => next()}
          previousStep={() => previous()}
        />
      );
    case 4:
      return (
        <RegisterStep5
          nextStep={() => next()}
          previousStep={() => previous()}
        />
      );
    case 5:
      return (
        <RegisterStep6
          nextStep={() => next()}
          previousStep={() => previous()}
        />
      );
    default:
      return (
        <RegisterStep1 nextStep={() => next()} cancelStep={() => cancel()} />
      );
  }
};

export default RegisterSteps;
