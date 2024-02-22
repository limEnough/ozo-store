export default {
  max: {
    id: 20,
    password: 16,
    name: 20,
    email: 50,
    title: 100,
    price: 15,
    mileage: 7,
    content: 20,
    addressName: 20,
    addressDetail: 70,
    shippingMessage: 30,
    accountHolder: 10,
    accountNumber: 38,
  },
  phone: {
    // #region 휴대폰 번호
    mobile: ['010', '016', '017', '018', '019'],
    // #endregion
    // #region 전국 지역 번호
    area: [
      '02',
      '051',
      '053',
      '052',
      '062',
      '042',
      '052',
      '044',
      '032',
      '033',
      '043',
      '041',
      '063',
      '061',
      '054',
      '055',
      '064',
    ],
    // #endregion
    // #region 전국 대표 번호
    national: [
      // SK브로드밴드
      '1566',
      '1600',
      '1670',
      // KT
      '1522',
      '1544',
      '1644',
      '1661',
      // SK텔링크
      '1599',
      // 세종텔레콤
      '1688',
      '1666',
      // LG 헬로비전
      '1855',
      // KCT
      '1811',
      '1877',
    ],
    // #endregion
    // #region 그 외
    etc: [
      // 예비번호
      '020',
      '040',
      '090',
      // UMS
      '030',
      // 안심번호
      '050',
      '0505',
      // 음성 ARS
      '060',
      // 인터넷 전홥
      '070',
      // 수신자부담
      '080',
    ],
    // #endregion
  },
};
