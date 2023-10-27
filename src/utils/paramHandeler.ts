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

export default useParamParser;
