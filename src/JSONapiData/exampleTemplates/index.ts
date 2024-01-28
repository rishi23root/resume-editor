import { JsonType } from '@/types/utils';
import data1 from './1.json'
import data2 from './2.json'
import data3 from './3.json'
import data4 from './4.json'

export const getTemplateByID = (id: string): JsonType => {
    switch (id) {
        case '1':
            return data1;
        case '2':
            return data2;
        case '3':
            return data3;
        case '4':
            return data4;
        default:
            return data1;
    }
}