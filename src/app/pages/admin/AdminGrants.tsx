import { useState } from 'react';
import { Search, Plus, Edit3, Trash2, Eye, CheckCircle, XCircle, Clock, Archive, ExternalLink, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockGrants, type Grant } from '../../data/mockData';

const statusTabs = [
  { key: 'all', label: '전체' },
  { key: 'open', label: '접수중' },
  { key: 'closing', label: '마감임박' },
  { key: 'closed', label: '마감됨' },
];

const conditionOptions = [
  { key: 'years_under_3', label: '업력 3년 미만' },
  { key: 'years_under_7', label: '업력 7년 미만' },
  { key: 'youth', label: '만 39세 이하 (청년)' },
  { key: 'female', label: '여성 대표' },
  { key: 'region_seoul', label: '서울' },
  { key: 'region_gyeonggi', label: '경기' },
  { key: 'region_national', label: '전국' },
  { key: 'it_sw', label: 'IT/SW' },
  { key: 'manufacturing', label: '제조업' },
  { key: 'fnb', label: 'F&B' },
  { key: 'small_biz', label: '소상공인' },
  { key: 'employees_under_5', label: '5인 미만' },
];

export function AdminGrants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingGrant, setEditingGrant] = useState<Grant | null>(null);
  const [showConditionPanel, setShowConditionPanel] = useState(false);
  const [enabledConditions, setEnabledConditions] = useState<string[]>(['years_under_3', 'region_gyeonggi', 'it_sw']);

  const filtered = mockGrants
    .filter((g) => statusFilter === 'all' || g.status === statusFilter)
    .filter((g) => g.title.includes(searchQuery) || g.organization.includes(searchQuery));

  const allSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(g => g.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleCondition = (key: string) => {
    setEnabledConditions(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1 rounded-lg" style={{ fontSize: '0.6875rem', fontWeight: 600 }}><CheckCircle className="w-3 h-3" /> 접수중</span>;
      case 'closing':
        return <span className="flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-lg" style={{ fontSize: '0.6875rem', fontWeight: 600 }}><Clock className="w-3 h-3" /> 마감임박</span>;
      case 'closed':
        return <span className="flex items-center gap-1 bg-gray-50 text-gray-500 px-2.5 py-1 rounded-lg" style={{ fontSize: '0.6875rem', fontWeight: 600 }}><XCircle className="w-3 h-3" /> 마감</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 sm:mb-8 flex-col sm:flex-row gap-3">
        <div>
          <h1 style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', fontWeight: 700 }}>지원금 관리</h1>
          <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>크롤링 데이터 검수 및 배포</p>
        </div>
        <motion.button
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-primary/15"
          style={{ fontSize: '0.8125rem', fontWeight: 500 }}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 20px rgba(49,130,246,0.25)' }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus className="w-4 h-4" />
          공고 추가
        </motion.button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-border p-1 mb-6 max-w-md">
        {statusTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              statusFilter === tab.key
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
            style={{ fontSize: '0.8125rem', fontWeight: 500 }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="공고명 또는 기관명 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-3 mb-4 flex items-center justify-between">
          <span className="text-primary" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
            {selectedIds.length}개 선택됨
          </span>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              style={{ fontSize: '0.75rem', fontWeight: 500 }}>
              <CheckCircle className="w-3.5 h-3.5" /> 배포
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
              style={{ fontSize: '0.75rem', fontWeight: 500 }}>
              <Archive className="w-3.5 h-3.5" /> 마감 처리
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
              style={{ fontSize: '0.75rem', fontWeight: 500 }}>
              <Trash2 className="w-3.5 h-3.5" /> 삭제
            </button>
          </div>
        </div>
      )}

      {/* Grant List Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-border">
                <th className="text-left px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-border text-primary accent-primary cursor-pointer"
                  />
                </th>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>공고명</th>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>기관</th>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>카테고리</th>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>마감일</th>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>상태</th>
                <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>지원금</th>
                <th className="text-right px-4 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((grant) => (
                <tr key={grant.id} className={`border-b border-border last:border-0 hover:bg-[#FAFBFC] transition-colors ${selectedIds.includes(grant.id) ? 'bg-primary/3' : ''}`}>
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(grant.id)}
                      onChange={() => toggleSelect(grant.id)}
                      className="w-4 h-4 rounded border-border text-primary accent-primary cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{grant.title}</span>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground" style={{ fontSize: '0.75rem' }}>{grant.organization}</td>
                  <td className="px-4 py-3.5">
                    <span className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-md" style={{ fontSize: '0.6875rem' }}>{grant.category}</span>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground" style={{ fontSize: '0.75rem' }}>{grant.deadline}</td>
                  <td className="px-4 py-3.5">{getStatusBadge(grant.status)}</td>
                  <td className="px-4 py-3.5" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{grant.maxAmount}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => { setEditingGrant(grant); setShowConditionPanel(true); }}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="조건 매핑"
                      >
                        <ToggleLeft className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="미리보기">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => { setEditingGrant(grant); setShowConditionPanel(false); }}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="수정"
                      >
                        <Edit3 className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="삭제">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Condition Mapping Modal */}
      <AnimatePresence>
      {editingGrant && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditingGrant(null)}
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
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 600 }} className="mb-6">
              {showConditionPanel ? '매칭 조건 설정' : '공고 수정'} - {editingGrant.title}
            </h3>

            {showConditionPanel ? (
              /* Condition Mapping Panel */
              <div className="space-y-5">
                <p className="text-muted-foreground" style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
                  유저 온보딩 항목과 매칭되는 조건을 ON/OFF로 설정하세요. 활성화된 조건이 유저 프로필과 일치하면 매칭됩니다.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {conditionOptions.map(option => {
                    const isEnabled = enabledConditions.includes(option.key);
                    return (
                      <button
                        key={option.key}
                        onClick={() => toggleCondition(option.key)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                          isEnabled
                            ? 'border-primary bg-accent'
                            : 'border-border bg-white'
                        }`}
                      >
                        <span style={{ fontSize: '0.8125rem', fontWeight: isEnabled ? 600 : 400 }}>{option.label}</span>
                        {isEnabled
                          ? <ToggleRight className="w-5 h-5 text-primary" />
                          : <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                        }
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[#F7F8FA] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>원문 링크</span>
                  </div>
                  <input
                    type="url"
                    placeholder="https://www.k-startup.go.kr/..."
                    defaultValue="https://www.k-startup.go.kr/example"
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    style={{ fontSize: '0.8125rem' }}
                  />
                </div>
              </div>
            ) : (
              /* Edit Form */
              <div className="space-y-4">
                <div>
                  <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>공고명</label>
                  <input type="text" defaultValue={editingGrant.title}
                    className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>기관</label>
                  <input type="text" defaultValue={editingGrant.organization}
                    className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>마감일</label>
                    <input type="date" defaultValue={editingGrant.deadline}
                      className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>상태</label>
                    <select defaultValue={editingGrant.status}
                      className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="open">접수중</option>
                      <option value="closing">마감임박</option>
                      <option value="closed">마감</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>설명</label>
                  <textarea defaultValue={editingGrant.description} rows={4}
                    className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <motion.button onClick={() => setEditingGrant(null)}
                className="flex-1 py-3 border border-border rounded-xl hover:bg-secondary transition-colors"
                style={{ fontWeight: 500, fontSize: '0.875rem' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                취소
              </motion.button>
              <motion.button onClick={() => setEditingGrant(null)}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl transition-all duration-200 shadow-md shadow-primary/15"
                style={{ fontWeight: 500, fontSize: '0.875rem' }}
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