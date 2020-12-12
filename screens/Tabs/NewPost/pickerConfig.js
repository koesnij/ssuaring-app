export const categoryConfig = {
  style: { inputIOS: { fontSize: 16, paddingVertical: 25 } },
  placeholder: {
    label: '카테고리 선택',
    value: null,
  },
  items: [
    { label: '유아동/유아도서', value: 1 },
    { label: '남성패션/잡화', value: 2 },
    { label: '여성의류', value: 3 },
    { label: '여성잡화', value: 4 },
    { label: '뷰티/미용', value: 5 },
    { label: '생활/가공식품', value: 6 },
    { label: '반려동물용품', value: 7 },
    { label: '스포츠/레저', value: 8 },
    { label: '도서/티켓/음반', value: 9 },
    { label: '디지털/가전', value: 10 },
    { label: '게임/취미', value: 11 },
    { label: '가구/인테리어', value: 12 },
    { label: '기타', value: 0 },
  ],
};

export const periodConfig = {
  style: {
    inputIOS: { fontSize: 16, paddingVertical: 10 },
  },
  placeholder: {
    label: '기간',
    value: null,
  },
  items: [
    { label: '30분', value: 1 },
    { label: '1시간', value: 2 },
    { label: '2시간', value: 4 },
    { label: '3시간', value: 6 },
    { label: '5시간', value: 10 },
    { label: '1일', value: 48 },
  ],
};

export const filterConfig = {
  style: {
    inputIOS: { fontSize: 16, paddingVertical: 10 },
  },
  placeholder: {
    label: '정렬순',
    value: null,
  },
  items: [
    { label: '인기순', value: 1 },
    { label: '최신순', value: 2 },
    { label: '조회순', value: 3 },
    { label: '사용자평점순', value: 4 },
  ],
};
