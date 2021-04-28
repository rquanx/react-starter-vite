import IIconLink from './IIconLink';
import Http from '@services/api';
import { Logger } from '@services/logger';
import { hasArrayData } from '@services/common/data';
import { IconLinkApi } from '../Entity/IconLink';
export class ApiIconLinkService implements IIconLink {
    private apiURL;
    private apiParam;
    /**
     * 
     * @param apiURL 请求链接
     * @param apiParam 请求数据
     */
    constructor(apiURL: string, apiParam?: any) {
        this.apiURL = apiURL;
        this.apiParam = apiParam;
    }
    async getIcons() {
        try {
            let queryResult = await Http.post(this.apiURL, this.apiParam);
            return {
                allCount: (queryResult as any).total,
                data: hasArrayData(queryResult.data) ? queryResult.data.map(item => (new IconLinkApi(item))) : [],
            };
        } catch (e) {
            Logger.Error("ApiIconLinkService getIcons", e);
            throw (e);
        }


    }
}