import { useState } from 'react';
import { Plus, Edit3, Copy, Trash2, FileCode, CheckCircle, Clock, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { aiTemplates } from '../../data/mockData';

export function AdminTemplates() {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof aiTemplates[0] | null>(null);

  const handleEdit = (template: typeof aiTemplates[0]) => {
    setSelectedTemplate(template);
    setShowEditor(true);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>AI 템플릿 관리</h1>
          <p className="text-muted-foreground" style={{ fontSize: '0.9375rem' }}>사업별 양식과 프롬프트 설정</p>
        </div>
        <motion.button
          onClick={() => { setSelectedTemplate(null); setShowEditor(true); }}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-primary/15"
          style={{ fontSize: '0.875rem', fontWeight: 500 }}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 20px rgba(49,130,246,0.25)' }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus className="w-4 h-4" />
          템플릿 추가
        </motion.button>
      </div>

      {/* Template Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {aiTemplates.map((template) => (
          <motion.div
            key={template.id}
            className="bg-white rounded-2xl border border-border p-6 hover:border-primary/15 transition-all duration-300 cursor-default"
            whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                  <FileCode className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{template.name}</h3>
                  <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{template.category}</span>
                </div>
              </div>
              {template.status === 'active' ? (
                <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1 rounded-lg" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  <CheckCircle className="w-3 h-3" /> 활성
                </span>
              ) : (
                <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-lg" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  <Clock className="w-3 h-3" /> 초안
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4 text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
              <span>사용: {template.usageCount}회</span>
              <span>수정: {template.lastUpdated}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(template)}
                className="flex items-center gap-1.5 px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}
              >
                <Edit3 className="w-3.5 h-3.5" /> 수정
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                <Copy className="w-3.5 h-3.5" /> 복제
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                <Eye className="w-3.5 h-3.5" /> 미리보기
              </button>
              <button className="p-2 rounded-lg hover:bg-red-50 transition-colors ml-auto">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Template Editor Modal */}
      <AnimatePresence>
      {showEditor && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowEditor(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }} className="mb-6">
              {selectedTemplate ? '템플릿 수정' : '새 템플릿 추가'}
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>템플릿 이름</label>
                <input
                  type="text"
                  defaultValue={selectedTemplate?.name || ''}
                  placeholder="예: 초기창업패키지 표준 양식"
                  className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>카테고리</label>
                  <select
                    defaultValue={selectedTemplate?.category || ''}
                    className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">선택</option>
                    <option value="창업지원">창업지원</option>
                    <option value="교육/멘토링">교육/멘토링</option>
                    <option value="디지털전환">디지털전환</option>
                    <option value="글로벌">글로벌</option>
                    <option value="성장지원">성장지원</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>상태</label>
                  <select
                    defaultValue={selectedTemplate?.status || 'draft'}
                    className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="active">활성</option>
                    <option value="draft">초안</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>섹션 구성</label>
                <textarea
                  rows={4}
                  defaultValue={selectedTemplate
                    ? '1. 창업 아이템 개요\n2. 시장 분석\n3. 비즈니스 모델\n4. 기술 및 제품 개발 현황\n5. 팀 구성 및 역량\n6. 자금 사용 계획'
                    : ''
                  }
                  placeholder="각 섹션을 줄바꿈으로 구분하세요..."
                  className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div>
                <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>AI 시스템 프롬프트</label>
                <textarea
                  rows={6}
                  defaultValue={selectedTemplate
                    ? '당신은 정부지원금 사업계획서 작성을 돕는 전문 AI입니다. 다음 원칙을 따르세요:\n1. 심사위원의 관점에서 설득력 있는 문장을 작성하세요.\n2. 구체적인 수치와 근거를 포함하세요.\n3. 해당 사업의 평가 기준에 맞춰 핵심 포인트를 강조하세요.\n4. 전문적이면서도 이해하기 쉬운 문장을 사용하세요.'
                    : ''
                  }
                  placeholder="AI가 지원서를 작성할 때 참고할 시스템 프롬프트를 입력하세요..."
                  className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono"
                  style={{ fontSize: '0.8125rem' }}
                />
              </div>

              <div>
                <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>작성 가이드 (유저에게 표시)</label>
                <textarea
                  rows={4}
                  defaultValue={selectedTemplate ? '각 섹션별 핵심 요구사항과 팁을 제공합니다. 심사 배점 비율도 함께 안내하여 유저가 중요도를 파악할 수 있게 합니다.' : ''}
                  placeholder="유저에게 보여줄 작성 가이드..."
                  className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                onClick={() => setShowEditor(false)}
                className="flex-1 py-3 border border-border rounded-xl hover:bg-secondary transition-colors"
                style={{ fontWeight: 500 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                취소
              </motion.button>
              <motion.button
                onClick={() => setShowEditor(false)}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl transition-all duration-200 shadow-md shadow-primary/15"
                style={{ fontWeight: 500 }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(49,130,246,0.25)' }}
                whileTap={{ scale: 0.98 }}
              >
                저장
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}