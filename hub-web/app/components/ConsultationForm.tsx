'use client';

import { useState } from 'react';
import { fields } from '../site-content';

export function ConsultationForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={compact ? 'consult-form compact consult-done' : 'consult-form consult-done'}>
        <p className="eyebrow">CONSULTATION</p>
        <h2>상담 접수 완료</h2>
        <p>상담 신청이 접수되었습니다. 담당자가 순차적으로 연락드립니다.</p>
        <button type="button" onClick={() => setSubmitted(false)}>다시 신청하기</button>
      </div>
    );
  }

  return (
    <form className={compact ? 'consult-form compact' : 'consult-form'} onSubmit={handleSubmit}>
      <p className="eyebrow">CONSULTATION</p>
      <h2>온라인 상담 신청</h2>
      <label>
        성함
        <input name="name" placeholder="홍길동" required />
      </label>
      <label>
        연락처
        <input name="phone" placeholder="010-0000-0000" required />
      </label>
      <label>
        상담분야
        <select name="field">
          <option value="">분야 선택</option>
          {fields.map((f) => (
            <option key={f.id} value={f.name}>{f.name}</option>
          ))}
        </select>
      </label>
      <label>
        상담내용
        <textarea name="message" placeholder="상담이 필요한 내용을 남겨주세요." required />
      </label>
      <button type="submit">상담 신청</button>
      <p className="form-note">상담 접수 후 담당자가 순차적으로 연락드립니다.</p>
    </form>
  );
}
