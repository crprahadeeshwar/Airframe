import { LegalPage } from "@/src/components/legal/legalPage";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="October 5, 2026"
      intro="This Privacy Policy explains what information Airframe collects and how it is used."
      sections={[
        {
          title: "1. Information We Collect",
          content: (
            <>
              <p>
                Airframe may collect account information such as your email
                address and information you voluntarily enter into your flight
                logs.
              </p>

              <p>
                Flight log information may include flight numbers, dates,
                airlines, aircraft types, registrations, airports, and notes.
              </p>
            </>
          ),
        },
        {
          title: "2. How We Use Information",
          content: (
            <p>
              Information is used to provide, maintain, secure, and improve
              Airframe and its functionality.
            </p>
          ),
        },
        {
            title: "3. How We Use Your Information",
            content: (
                <p>
                We use collected information to provide and operate Airframe,
                authenticate users, store and display flight logs, maintain
                account security, troubleshoot problems, and improve the service.
                </p>
            ),
            },
            {
            title: "4. Flight Log Data",
            content: (
                <p>
                Flight information that you enter into Airframe is stored so that
                it can be associated with your account and displayed back to you.
                You are responsible for ensuring that information you enter is
                appropriate for storage in the service.
                </p>
            ),
            },
            {
            title: "5. Third-Party Services",
            content: (
                <p>
                Airframe relies on third-party infrastructure and service providers
                to operate parts of the application, such as hosting, authentication,
                databases, and deployment. These providers may process information
                as necessary to provide their services.
                </p>
            ),
            },
            {
            title: "6. Authentication and Cookies",
            content: (
                <p>
                Airframe may use cookies or similar technologies required for
                authentication, maintaining sessions, and providing core
                functionality. These technologies are not intended to be used for
                advertising or cross-site tracking.
                </p>
            ),
            },
            {
            title: "7. Data Retention and Deletion",
            content: (
                <p>
                Your account and associated flight data may be retained for as long
                as your account remains active or as otherwise necessary to operate
                the service. If you want your account or data deleted, contact us
                at [ops.vantstudio@gmail.com].
                </p>
            ),
            },
            {
            title: "8. Data Security",
            content: (
                <p>
                Reasonable measures are used to protect information stored by
                Airframe. However, no internet-connected service can guarantee
                absolute security, and you should avoid submitting information that
                you consider highly sensitive.
                </p>
            ),
            },
            {
            title: "9. Children's Privacy",
            content: (
                <p>
                Airframe is not intended for children who are below the minimum age
                required to use online services under applicable law. We do not
                knowingly collect personal information from children in violation
                of applicable requirements.
                </p>
            ),
            },
            {
            title: "10. Changes to This Privacy Policy",
            content: (
                <p>
                This Privacy Policy may be updated from time to time. The "Last
                updated" date at the top of this page will indicate when changes
                were most recently made. Continued use of Airframe after changes
                take effect constitutes acceptance of the updated policy.
                </p>
            ),
            },
            {
            title: "11. Contact",
            content: (
                <p>
                If you have questions or requests regarding this Privacy Policy or
                your personal information, you can contact us at
                [ops.vantstudio.com].
                </p>
            ),
            },

      ]}
    />
  );
}