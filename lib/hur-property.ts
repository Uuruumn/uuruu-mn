// ХУР システムの不動産データ処理ライブラリ
// DAN OAuth認証後に取得したサービスデータから物件情報を抽出する

export interface Property {
  propertyNumber: string;  // үл хөдлөх хөрөнгийн дугаар
  address: string;         // хаяг
  propertyType: string;    // төрөл
  area: number;            // талбай (м²)
  ownerName: string;       // өмчлөгчийн нэр
  certificateNumber: string; // гэрчилгээний дугаар
}

// DANサービスデータから物件リストを抽出
export function extractPropertyList(danServiceData: any): Property[] {
  try {
    const services = danServiceData?.services;
    if (!services) return [];

    const propertyListService = services['WS100202_getPropertyList'];
    if (!propertyListService || propertyListService.resultCode !== 0) return [];

    const response = propertyListService.response;
    if (!response) return [];

    // レスポンス構造に合わせて変換
    const properties = Array.isArray(response) ? response : [response];

    return properties.map((p: any) => ({
      propertyNumber: p.propertyNumber || p.property_number || '',
      address: p.address || p.full_address || '',
      propertyType: p.propertyType || p.property_type || '',
      area: Number(p.area) || 0,
      ownerName: p.ownerName || p.owner_name || '',
      certificateNumber: p.certificateNumber || p.certificate_number || '',
    }));
  } catch (error) {
    console.error('物件リスト抽出エラー:', error);
    return [];
  }
}

// DANサービスデータから特定物件の詳細を抽出
export function extractPropertyInfo(danServiceData: any): Property | null {
  try {
    const services = danServiceData?.services;
    if (!services) return null;

    const propertyInfoService = services['WS100201_getPropertyInfo'];
    if (!propertyInfoService || propertyInfoService.resultCode !== 0) return null;

    const p = propertyInfoService.response;
    if (!p) return null;

    return {
      propertyNumber: p.propertyNumber || p.property_number || '',
      address: p.address || p.full_address || '',
      propertyType: p.propertyType || p.property_type || '',
      area: Number(p.area) || 0,
      ownerName: p.ownerName || p.owner_name || '',
      certificateNumber: p.certificateNumber || p.certificate_number || '',
    };
  } catch (error) {
    console.error('物件情報抽出エラー:', error);
    return null;
  }
}