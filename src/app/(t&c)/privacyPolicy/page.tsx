"use client";
import { PageProps } from "@/types/utils";
import Link from "next/link";

// test for payment page here once then del it for good
export default function PrivacyPolicy(props: PageProps) {
  return (
    <div className="m-4 p-4  lg:mx-auto lg:w-[70%]">
      <h1 className="text-3xl font-extrabold mb-4">Privacy Policy</h1>
      <div className="mb-2">
        rishi23root built the build your resume app as a Commercial app. This
        SERVICE is provided by rishi23root and is intended for use as is.
      </div>
      <div className="mb-2">
        This page is used to inform visitors regarding my policies with the
        collection, use, and disclosure of Personal Information if anyone
        decided to use my Service.
      </div>
      <div className="mb-2">
        If you choose to use my Service, then you agree to the collection and
        use of information in relation to this policy. The Personal Information
        that I collect is used for providing and improving the Service. I will
        not use or share your information with anyone except as described in
        this Privacy Policy.
      </div>
      <div className="mb-2">
        The terms used in this Privacy Policy have the same meanings as in our
        Terms and Conditions, which are accessible at build your resume unless
        otherwise defined in this Privacy Policy.
      </div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold my-4 pt-4">
          Information Collection and Use
        </h1>
      </div>
      <div className="mb-2">
        For a better experience, while using our Service, I may require you to
        provide us with certain personally identifiable information, including
        but not limited to name, email. The information that I request will be
        retained on your device and is not collected by me in any way.
      </div>
      <div>
        <div className="mb-2">
          The app does use third-party services that may collect information
          used to identify you.
        </div>
        <div className="mb-2">
          Link to the privacy policy of third-party service providers used by
          the app
        </div>
        <ul className="list-disc	pl-4 py-2">
          <li>
            <Link
              href="https://clerk.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-300 hover:text-blue-700"
            >
              Clerk
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold my-4 pt-4">Log Data</h1>
      </div>
      <div className="mb-2">
        I want to inform you that whenever you use my Service, in a case of an
        error in the app I collect data and information (through third-party
        products) on your phone called Log Data. This Log Data may include
        information such as your device Internet Protocol (“IP”) address, device
        name, operating system version, the configuration of the app when
        utilizing my Service, the time and date of your use of the Service, and
        other statistics.
      </div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold my-4 pt-4">Cookies</h1>
      </div>
      <div className="mb-2">
        Cookies are files with a small amount of data that are commonly used as
        anonymous unique identifiers. These are sent to your browser from the
        websites that you visit and are stored on your device's internal memory.
      </div>
      <div className="mb-2">
        This Service does not use these “cookies” explicitly. However, the app
        may use third-party code and libraries that use “cookies” to collect
        information and improve their services. You have the option to either
        accept or refuse these cookies and know when a cookie is being sent to
        your device. If you choose to refuse our cookies, you may not be able to
        use some portions of this Service.
      </div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold my-4 pt-4">Service Providers</h1>
      </div>
      <div className="mb-2">
        I may employ third-party companies and individuals due to the following
        reasons:
      </div>
      <ul className="list-disc pl-4	">
        <li>To facilitate our Service;</li>
        <li>To provide the Service on our behalf;</li>
        <li>To perform Service-related services; or</li>
        <li>To assist us in analyzing how our Service is used.</li>
      </ul>
      <div className="my-2">
        I want to inform users of this Service that these third parties have
        access to their Personal Information. The reason is to perform the tasks
        assigned to them on our behalf. However, they are obligated not to
        disclose or use the information for any other purpose.
      </div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold my-4 pt-4">Security</h1>
      </div>
      <div className="mb-2">
        I value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and I cannot guarantee
        its absolute security.
      </div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold my-4 pt-4">
          Links to Other Sites
        </h1>
      </div>
      <div className="mb-2">
        This Service may contain links to other sites. If you click on a
        third-party link, you will be directed to that site. Note that these
        external sites are not operated by me. Therefore, I strongly advise you
        to review the Privacy Policy of these websites. I have no control over
        and assume no responsibility for the content, privacy policies, or
        practices of any third-party sites or services.
      </div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold my-4 pt-4">
          Children’s Privacy
        </h1>
      </div>
      <div>
        <div className="mb-2">
          These Services do not address anyone under the age of 13. I do not
          knowingly collect personally identifiable information from children
          under 13 years of age. In the case I discover that a child under 13
          has provided me with personal information, I immediately delete this
          from our servers. If you are a parent or guardian and you are aware
          that your child has provided us with personal information, please
          contact me so that I will be able to do the necessary actions.
        </div>
      </div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold my-4 pt-4">
          Changes to This Privacy Policy
        </h1>
      </div>
      <div className="mb-2">
        I may update our Privacy Policy from time to time. Thus, you are advised
        to review this page periodically for any changes. I will notify you of
        any changes by posting the new Privacy Policy on this page.
      </div>
      <div className="mb-2">This policy is effective as of 2024-02-08</div>
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold my-4 pt-4">Contact Us</h1>
      </div>
      <div className="mb-2">
        If you have any questions or suggestions about my Privacy Policy, do not
        hesitate to contact me at{" "}
        <Link
          href="mailto:contact@buildyourresume.online"
          className="underline text-blue-300 hover:text-blue-700"
        >
          contact@buildyourresume.online
        </Link>
      </div>
    </div>
  );
}
