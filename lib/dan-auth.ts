// DAN OAuth2.0 認証ライブラリ
// 契約後に NEXT_PUBLIC_DAN_CLIENT_ID と DAN_CLIENT_SECRET を .env.local に追加する

const DAN_BASE_URL = 'https://sso.gov.mn';

// 必要なХУРサービス
const REQUIRED_SERVICES = [
  {
    services: ['WS100202_getPropertyList'],
    wsdl: 'https://xyp.gov.mn/property-1.3.0/ws?WSDL',
  },
  {
    services: ['WS100201_getPropertyInfo'],
    wsdl: 'https://xyp.gov.mn/property-1.3.0/ws?WSDL',
    params: {
      WS100201_getPropertyInfo: {
        propertyNumber: 'value',
      },
    },
  },
];

// serviceパラメータをbase64エンコード
function encodeServices(): string {
  const json = JSON.stringify(REQUIRED_SERVICES);
  return Buffer.from(json).toString('base64');
}

// DANログインURLを生成
export function getDanAuthUrl(redirectUri: string): string {
  const clientId = process.env.NEXT_PUBLIC_DAN_CLIENT_ID;
  if (!clientId) {
    throw new Error('DAN_CLIENT_ID が設定されていません');
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'openid',
    service: encodeServices(),
  });

  return `${DAN_BASE_URL}/oauth2/authorize?${params.toString()}`;
}

// codeをaccess tokenに交換
export async function exchangeCodeForToken(
  code: string,
  redirectUri: string
): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_DAN_CLIENT_ID;
  const clientSecret = process.env.DAN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('DAN の環境変数が設定されていません');
  }

  const res = await fetch(`${DAN_BASE_URL}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }),
  });

  if (!res.ok) {
    throw new Error('Token交換に失敗しました');
  }

  const data = await res.json();
  return data.access_token;
}

// access tokenでХУРサービスのデータを取得
export async function getDanServiceData(accessToken: string): Promise<any> {
  const res = await fetch(`${DAN_BASE_URL}/oauth2/api/v1/service`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('サービスデータの取得に失敗しました');
  }

  return res.json();
}