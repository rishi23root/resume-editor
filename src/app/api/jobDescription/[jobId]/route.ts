// /api/jobDescription/[jobId]/
import { jobIdAndNameType } from '@/types/jobDescription';
import { NextResponse } from 'next/server';

import data from '../data.json';
const jsonData:jobIdAndNameType = data

export async function GET(request: Request) {
    const jobId = request.url.slice(request.url.lastIndexOf('/') + 1);

    if (!jsonData){
        return NextResponse.json({},{status: 500});
    }
    
    if (jsonData.hasOwnProperty(jobId)){
        const dataForId = jsonData[jobId].templates ;
        return NextResponse.json(dataForId  ,{status: 200});
    }
    return NextResponse.json([] ,{status: 404});
}