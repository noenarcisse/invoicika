export interface IDataList {
    hasEmptyData(): Promise<void>;
    hasData(): Promise<void>;
}
