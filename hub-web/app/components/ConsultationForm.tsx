export function ConsultationForm({ compact = false }: { compact?: boolean }) {
  return (
    <form className={compact ? 'consult-form compact' : 'consult-form'}>
      <p className="eyebrow">CONSULTATION</p>
      <h2>온라인 상담 신청</h2>
      <label>
        성함
        <input name="name" placeholder="홍길동" />
      </label>
      <label>
        연락처
        <input name="phone" placeholder="010-0000-0000" />
      </label>
      <label>
        상담내용
        <textarea name="message" placeholder="상담이 필요한 내용을 남겨주세요." />
      </label>
      <button type="submit">상담 신청</button>
      <p className="form-note">상담 접수 후 담당자가 순차적으로 연락드립니다.</p>
    </form>
  );
}
