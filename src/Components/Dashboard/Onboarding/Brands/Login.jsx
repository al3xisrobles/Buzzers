import Logo from "../../../../Assets/Dashboard/LogoYellow.svg"
import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import { signUp } from 'aws-amplify/auth';

const components = {
  Header() {
    return (
      <div className="w-full flex flex-col gap-8 items-center justify-center pb-10">
        <img src={Logo} className="w-20" alt="Buzzers"/>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl p-2">Event sponsorship, reimagined.</h1>
          <p>Ready to get started?</p>
        </div>
      </div>
    );
  },

  SignIn: {
    Footer() {
      const { toForgotPassword } = useAuthenticator();

      return (
        <div className="flex justify-center">
          <button onClick={toForgotPassword}>
            Reset Password
          </button>
        </div>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      return (
        <h2 className="text-center font-bold">
          Welcome!
        </h2>
      );
    },
  },
  ConfirmSignIn: {
    Header() {
      return (
        <h2>
          Enter Information:
        </h2>
      );
    },
    Footer() {
      return <p>Footer Information</p>;
    },
  },
  ForgotPassword: {
    Header() {
      return (
        <h2 className="text-center">
          <span className="font-bold">Forgot your password?</span> Enter your email so we can send you a verification code.
        </h2>
      );
    },
  },
  ConfirmResetPassword: {
    Header() {
      return (
        <h2 className="text-center">
          Enter the <span className="font-bold">verification code</span> we sent along with a <span className="font-bold">new, safe password</span>
        </h2>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    'custom:brand_name': {
      label: 'Brand Name',
      placeholder: "Olipop",
      isRequired: true,
      order: 1,
    },
    'custom:brand_website': {
      label: 'Website',
      placeholder: 'www.drinkolipop.com',
      isRequired: true,
      order: 2,
    },
    'custom:first_name': {
      label: 'Representative First Name',
      placeholder: 'Ben',
      isRequired: true,
      order: 3,
    },
    'custom:last_name': {
      label: 'Representative Last Name',
      placeholder: 'Goodwin',
      isRequired: true,
      order: 3,
    },
    email: {
      label: 'Representative Email',
      placeholder: 'ben@olipop.com',
      isRequired: true,
      order: 4,
    },
    password: {
      label: "Password",
      placeholder: 'YourPasswordGoesHere!',
      order: 5,
    },
    confirm_password: {
      label: "Confirm Passsword",
      placeholder: 'YourPasswordGoesHere!',
      order: 6,
    },
    phone_number: {
      label: 'Phone Number (optional)',
      placeholder: '1234567890',
      dialCode: '+1',
      isRequired: false,
      order: 7,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your password',
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      label: 'Confirmation Code',
      placeholder: '123456',
      isRequired: true,
    },
    confirm_password: {
      placeholder: 'New Password',
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

function BrandLogin() {
  const { route } = useAuthenticator();
  const [recordedRoutes, setRecordedRoutes] = useState([]);

  // There's some bug where the page renders the default authenticator component
  // instead of the one we've defined. The following 2 useEffects is a temporary fix.
  useEffect(() => {
    if (recordedRoutes[0] === 'signIn') {
      window.location.reload();
    }
  }, [recordedRoutes]);

  useEffect(() => {
    setRecordedRoutes(prevRoutes => [...prevRoutes, route]);
  }, [route]);

  const services = {
    async handleSignUp(input) {
      // custom username and email
      const { username, password, options } = input;
      return signUp({
        username: username,
        password,
        options: {
          ...options,
          userAttributes: {
            ...options?.userAttributes,
            'custom:user_type': 'brand',
          }
        },

      });
    },
  };

  return (
    <Authenticator
      formFields={formFields}
      components={components}
      initialState="signUp"
      services={services}
    >
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  )
}

export default BrandLogin
