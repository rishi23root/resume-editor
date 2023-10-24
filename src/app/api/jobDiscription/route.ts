// /api/jobDiscription/

import { jobIdAndNameType } from '@/types/jobDiscription';
import { keyValue } from '@/types/utils';
import { NextResponse } from 'next/server';
import data from './data.json';

const jsonData:jobIdAndNameType = data


// get all the titles for the job, create a dict of jobid and title
export async function GET(req:Request) {
    if (!jsonData){
        return NextResponse.json({},{status: 500});
    }

    const jobTitles = Object.entries(jsonData).reduce<keyValue<string>>((result, [key,val]) => {
        result[key] = val.title 
        return result;
    }, {});
    return NextResponse.json(jobTitles  ,{status: 200});
}