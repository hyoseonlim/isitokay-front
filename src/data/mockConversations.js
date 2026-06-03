export const mockConversations = [
  {
    id: 'c1',
    title: '타이레놀 복용 가능 여부',
    preview: '감기에 걸렸는데 타이레놀정 500mg 먹어도 돼?',
    date: '2025.05.31',
    resultTone: 'green',
    messages: [
      { role: 'user', content: '감기에 걸렸는데 타이레놀정 500mg 먹어도 돼?' },
      {
        role: 'ai',
        content:
          '등록된 복용 정보와 임신 5주차 상태를 기준으로 함께 확인해볼게요. 훼로바유서방정·폴산정·타이레놀정 500mg 조합을 살펴볼게요.',
        analysisCard: {
          existing: ['훼로바유서방정', '폴산정'],
          newItem: '타이레놀정 500mg',
          criteria: ['약↔약 병용금기', '임부금기', '회수·판매중지', '공식 문서 근거'],
        },
      },
      {
        role: 'ai',
        content:
          '세 제품 조합에서 현재 확인된 주요 위험정보는 없어요. 다만 임신 중 복용 여부는 개인 상태·복용량·복용 횟수에 따라 달라질 수 있어 전문가 상담을 권장드려요.',
        resultTone: 'green',
        resultLabel: '분석 결과 · 주요 위험정보 미확인',
        hasResult: true,
      },
    ],
  },
  {
    id: 'c2',
    title: '스코폴리아엑스 함유 제품',
    preview: '처방받은 소화제가 임산부에게 괜찮을지 궁금해요',
    date: '2025.05.28',
    resultTone: 'red',
    messages: [
      { role: 'user', content: '처방받은 소화제가 임산부에게 괜찮을지 궁금해요' },
      {
        role: 'ai',
        content: '성분표를 분석했어요. 임산부 투여 금기 성분이 포함되어 있어요.',
        resultTone: 'red',
        resultLabel: '임산부 투여 금기 성분 포함',
        hasResult: true,
      },
    ],
  },
  {
    id: 'c3',
    title: '오리온 그래놀라바 안전 여부',
    preview: '오리온 그래놀라바 먹어도 되나요?',
    date: '2025.05.25',
    resultTone: 'yellow',
    messages: [
      { role: 'user', content: '오리온 그래놀라바 먹어도 되나요?' },
      {
        role: 'ai',
        content: '등록된 성분과 현재 복용 중인 약물 기준으로 분석했어요. 추가 확인이 필요한 항목이 있어요.',
        resultTone: 'yellow',
        resultLabel: '추가 확인 권장',
        hasResult: true,
      },
    ],
  },
];
