import { LegalPage } from "@/src/components/legal/LegalPage";

/* eslint-disable react/no-unescaped-entities */
export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="October 5, 2026"
      intro="These Terms of Service govern your use of Airframe."
      sections={[
        {
          title: "1. About Airframe",
          content: (
            <p>
              Airframe is a personal flight logging application that allows
              users to record, view, search, and manage flight information.
            </p>
          ),
        },
        {
          title: "2. Accounts",
          content: (
            <p>
              You are responsible for maintaining the security of your
              account and for activity carried out through your account.
            </p>
          ),
        },
        {
          title: "3. Flight Data",
          content: (
            <p>
              You retain responsibility for the information you enter into
              Airframe. You should not rely on Airframe as an authoritative
              source of aviation, operational, or safety information.
            </p>
          ),
        },
        {
        title: "4. Availability",
        content: (
            <p>
            Airframe is provided on an experimental and best-effort basis.
            The service may be modified, interrupted, suspended, or discontinued
            at any time. We do not guarantee that Airframe will always be
            available, error-free, or compatible with every device or browser.
            </p>
        ),
        },
        {
        title: "5. Acceptable Use",
        content: (
            <p>
            You agree not to misuse Airframe, attempt to gain unauthorized
            access to accounts or systems, interfere with the operation of the
            service, or use the service for unlawful purposes.
            </p>
        ),
        },
        {
        title: "6. Account Termination",
        content: (
            <p>
            You may stop using Airframe at any time. We reserve the right to
            suspend or terminate access to an account if necessary to protect
            the service, its users, or its infrastructure, or if the service
            is discontinued.
            </p>
        ),
        },
        {
        title: "7. Changes to the Service",
        content: (
            <p>
            Airframe may be updated, changed, or discontinued without prior
            notice. Features may be added, removed, or modified as development
            of the service continues.
            </p>
        ),
        },
        {
        title: "8. Disclaimer",
        content: (
            <p>
            Airframe is provided on an "as is" and "as available" basis.
            Airframe is intended as a personal flight logging and organization
            tool and is not an aviation operational, navigation, safety, or
            regulatory service. Information stored in or displayed by Airframe
            should not be relied upon for flight operations or safety-critical
            decisions.
            </p>
        ),
        },
        {
        title: "9. Limitation of Liability",
        content: (
            <p>
            To the maximum extent permitted by applicable law, the operators of
            Airframe will not be liable for losses or damages arising from your
            use of, or inability to use, the service, including loss of data,
            service interruptions, or inaccuracies in information.
            </p>
        ),
        },
        {
        title: "10. Changes to These Terms",
        content: (
            <p>
            These Terms may be updated from time to time. The "Last updated"
            date at the top of this page will indicate when changes were most
            recently made. Continued use of Airframe after changes take effect
            constitutes acceptance of the updated Terms.
            </p>
        ),
        },
        {
        title: "11. Contact",
        content: (
            <p>
            If you have questions about these Terms, you can contact us at
            [ops.vantstudio.com].
            </p>
        ),
        },
      ]}
    />
  );
}