import { serverAPI } from "@/serverTRPC/serverAPI";
import {
  encodeJSONToBase64,
  jsonToSearchParameters,
} from "@/utils/paramHandeler";
import { currentUser } from "@clerk/nextjs";

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
  // get price data usign trpc
  const priceData = await serverAPI.price.all();

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
