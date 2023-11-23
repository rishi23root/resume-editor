import { priceDataType } from "@/types/payment";
import {
  encodeJSONToBase64,
  jsonToSearchParameters,
} from "@/utils/paramHandeler";
import { currentUser } from "@clerk/nextjs";

export const priceData: priceDataType[] = [
  {
    id: 1,
    title: "Basic Package",
    price: "Rs. 10",
    description: "Essential Resume Package",
    features: [
      "Chose from Top Templates (limited)",
      "AI integration",
      "ATS integration",
      "Single click builder",
    ],
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Advanced Package",
    price: "Rs. 50",
    description: "Enhanced Resume Package",
    features: [
      "Everything in Basic plan",
      "No limit in Template Choice",
      "Mentor Review",
      "Create Resume according to Job Description",
    ],
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Premium Package",
    price: "Let's Talk",
    description: "Estimate Resume Package",
    features: [
      "Mass building",
      "Everything in basic plan ",
      "Everything in Advance plan",
      "Price discussion",
      "Updates According to need (organization logo, etc)",
    ],
    link: "/dashboard",
  },
];

const startFreshSearchParams = {
  _s: encodeJSONToBase64({
    mode: "newResume",
  }),
};
const afterPaymentRedirection = {
  _s: encodeJSONToBase64({
    mode: "newResume",
    procegure: 4,
  }),
};

const usePriceJson = async (paymentLinks: Boolean = false) => {
  // use clerk to check if the user is logged in or not
  const user = await currentUser();

  // if user is logged in then show the price data will the link to the payment page
  if (user?.id && !paymentLinks) {
    const params = await jsonToSearchParameters(startFreshSearchParams);
    return priceData.map((item) => {
      return {
        ...item,
        link: "/New?" + params + "&payId=" + item.id,
      };
    });
  } else if (user?.id && paymentLinks) {
    
    // make product link for rozerpay component from id in the priceData and after payment success give redirect to the provided link
    const params = await jsonToSearchParameters(afterPaymentRedirection);
    return priceData.map((item) => {
      return {
        ...item,
        link: "/Builder?" + params + "&payId=" + item.id,
      };
    });
  }

  return priceData;
};

export default usePriceJson;
