import usePriceJson from "@/hooks/PriceJson";
import { cn } from "@/lib/utils";
import { priceDataType } from "@/types/payment";
import { JsonType, PageProps } from "@/types/utils";
import useParamParser, {
  encodeJSONToBase64,
  jsonToSearchParameters
} from "@/utils/paramHandeler";
import { ClassValue } from "clsx";
import Link from "next/link";

export default async function paymentPage(props: PageProps) {
  const { stringifiedData, privateData } = await useParamParser(
    "/Payment",
    props.searchParams
  );
  console.log("from payment: ", stringifiedData, privateData);

  // after payment redirect link
  const afterPaymentRedirection = await jsonToSearchParameters({
    ...props.searchParams,
    _s: encodeJSONToBase64({
      ...(privateData ? (privateData as JsonType) : {}),
      procegure: 4,
    }),
  });

  const data = await usePriceJson(true);
  return (
    // make whole page with 10/12 width and center it on above medium screens
    <main className="flex-1 md:fr fc gap-4 justify-center ">
      <PaymentCard
        data={data[0]}
        onSuceessRedirectUrl={"/Builder?" + afterPaymentRedirection}
      />
      <PaymentCard
        data={data[1]}
        buttonStyle="bg-gradient-to-r from-blue-600 to-fuchsia-500 border-stone-500 "
        onSuceessRedirectUrl={"/Builder?" + afterPaymentRedirection}
      />
      {/* <PaymentCard data={data[2]} /> */}
    </main>
  );
}

function PaymentCard({
  data,
  className,
  buttonStyle,
  onSuceessRedirectUrl,
}: {
  data: priceDataType;
  className?: ClassValue;
  buttonStyle?: ClassValue;
  onSuceessRedirectUrl?: any;
}) {
  // read existing data from the url and add the procegure to it and payid to it
  // work on payment handeler from rozerpay ## to do / #updates

  // no need to update the redirect url as it will be updated in the payment page because it will be the last page before the builder page
  const linkToNextStep = onSuceessRedirectUrl + "&payId=" + data.id;

  return (
    <div className="flex-1">
      <div
        className={cn(
          "flex-1 gap-4 p-6 bg-black/10 glass fcb fc min-w-80 rounded-3xl",
          className
        )}
      >
        <div className="gap-8 fss fc w-full ">
          <div className="fc fsc gap-1 w-full">
            <div className="fr justify-between  ">
              <div className="text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-fuchsia-500">
                {data.title}
              </div>
              <div className="text-4xl font-semibold text-center text-neutral-200">
                {data.price}
              </div>
            </div>
            <div className="text-2xl font-medium text-zinc-400">
              {data.description}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center w-full gap-2">
            <div className="text-sm font-semibold text-zinc-100">
              What&lsquo;s incuded:
            </div>
            <div className="w-full gap-2 text-xl font-medium fss fc text-zinc-400 text-opacity-80">
              {data.features.map((feature: string,index) => (
                <li key={index} className="list-item hover:list-decimal duration-200">
                  {feature}
                </li>
              ))}
            </div>
          </div>
        </div>
        <Link
          href={linkToNextStep}
          className={cn(
            "w-full p-2 border rounded-2xl border-stone-500 fcc",
            buttonStyle
          )}
        >
          <div className="text-xl font-medium text-white/90">Select {"->"}</div>
        </Link>
      </div>
    </div>
  );
}
