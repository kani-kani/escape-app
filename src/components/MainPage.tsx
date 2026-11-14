import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { type RootState } from '../app/store';
// import Logout from './Logout';

 // 1ページあたりの表示件数
const ITEMS_PER_PAGE = 20;

export default function MainPage() {
  const { name } = useSelector((state: RootState) => state.user);
  const { quizList } = useSelector((state: RootState) => state.quiz);

  // 現在のページ数
  const [currentPage, setCurrentPage] = useState(0);

  // ページネーションの計算
  const totalPages = Math.ceil(quizList.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuizzes = quizList.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '5px' }}>ようこそ、{name} さん！</h1>
        <p style={{ color: '#7f8c8d', marginTop: '0' }}>謎解きの部屋へエントリーしました。</p>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '18px', color: '#4a5568', borderBottom: '2px solid #edf2f7', paddingBottom: '10px', marginBottom: '15px' }}>
          問題一覧 ({startIndex + 1} 〜 {Math.min(endIndex, quizList.length)}問目 / 全{quizList.length}問)
        </h2>

        {quizList.length === 0 ? (
          <p style={{ color: '#a0aec0', textAlign: 'center', padding: '20px' }}>表示できる問題がありません。</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
            {currentQuizzes.map((quiz, index) => (
              <li 
                key={quiz.id} 
                style={{ 
                  padding: '12px 15px', 
                  borderBottom: '1px solid #edf2f7', 
                  display: 'flex', 
                  alignItems: 'center',
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff'
                }}
              >
                <span style={{ fontWeight: 'bold', color: '#4a5568', marginRight: '20px', width: '60px' }}>
                  No. {startIndex + index + 1}
                </span>
                <Link 
                  to={`/quiz/${quiz.id}`} 
                  style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 500, flex: 1 }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  {quiz.questionText.split('\n')[0] /* 1行目をタイトルとして簡易抽出 */}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 0}
              style={{
                padding: '8px 16px',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: currentPage === 0 ? '#cbd5e0' : '#4a5568',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}
            >
              前へ
            </button>
            <span style={{ color: '#4a5568', fontWeight: 'bold' }}>
              {currentPage + 1} / {totalPages} ページ
            </span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages - 1}
              style={{
                padding: '8px 16px',
                cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                backgroundColor: currentPage === totalPages - 1 ? '#cbd5e0' : '#4a5568',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}
            >
              次へ
            </button>
          </div>
        )}
      </div>
      {/* <Logout/> */}
    </div>
  );
}
