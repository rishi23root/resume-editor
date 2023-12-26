import { JsonType, privateData, searchParamType } from "@/types/utils";
import { redirect } from "next/navigation";


// Function to encode JSON data into base64 format
export const encodeJSONToBase64 = (data: privateData):string => {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
};

// Function to decode base64 data into JSON
export const decodeBase64ToJSON = (base64Data: string) => {
  try{
    const jsonString = atob(base64Data);
    return JSON.parse(jsonString);
  } catch (e) {
    return {"error": "error decoding data, have to restart building :( "};
  }
};

// function to convert a JSON object to URL search parameters
export const jsonToSearchParameters = async (jsonData: JsonType):Promise<string> => {
  if (jsonData.hasOwnProperty("_s")){
    jsonData["_s"] = decodeURI(jsonData["_s"]);
    // jsonData["_s"] = encodeJSONToBase64(jsonData["_s"]);
  }
  const searchParams = new URLSearchParams(jsonData)
  return searchParams.toString()
}

// function to convert URL search parameters to JSON object (mostly used to decode)
const useParamParser = async (currentPage: string, params: searchParamType) => {
  // aim :
  // read current params 
  // update new params and make it stringified
  // console.log(params);
  
  const stringifiedData = await jsonToSearchParameters(params);
  let privateData:privateData = {}
  if (typeof params._s === 'string') {
    privateData = await (params._s ?  decodeBase64ToJSON(params._s as string): {})
    // console.log("132: ",privateData);
  }
  if (privateData.hasOwnProperty('error')) {
    redirect(currentPage + '?error=' + privateData?.error)
  }
  return {
    stringifiedData,
    privateData,
  };
};

// need to work on this function
// replica of the client side function but for server side urlWithAddedParams
// const 
export const urlWithAddedParams = (
    pathName: string,
    params: searchParamType,
    newSearchParams: searchParamType = {},
    updatePrivate: searchParamType["_s"] = {}
  ) => {
    if (Object.keys(updatePrivate).length) {
      // decode the _s
      // add data and update it
      var privateData = {};
      if (params._s) {
        privateData = decodeBase64ToJSON(params._s as string);
        // console.log(searchParams.get("_s") || {}, privateData);
      }
      const encodedprivateData = encodeJSONToBase64({
        ...privateData,
        ...(updatePrivate as any),
      });
      newSearchParams = { ...newSearchParams, _s: encodedprivateData };
    }

    const addToCurrentQuery = (data: searchParamType) => {
      const Params = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => Params.set(key, value));
      Object.entries(data).forEach(([key, value]) => Params.set(key, value));
      return Params.toString() ? "?" + Params.toString() : "";
    }

    return (
      pathName  + addToCurrentQuery(newSearchParams)
    );
};


// Example of how to use the function

// const test = urlWithAddedParams(
//     "/Builder",
//     props.searchParams,
//     { templateName: "singleColumn" },
//     { procegure: 1 }
//   );
//   console.log(test);



export default useParamParser;
