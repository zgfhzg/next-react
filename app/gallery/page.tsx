'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface GalleryItem {
    id: string;
    title: string;
    summary: string;
    style: string;
    img: string;
}

const initialGalleryList: GalleryItem[] = [
    {
        id: '1',
        title: "Magna",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus rutrum facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        style: "style1",
        img: "/images/pic01.jpg",
    },
    {
        id: '2',
        title: "Lorem",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat. Proin vel hendrerit libero. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
        style: "style2",
        img: "/images/pic02.jpg",
    },
    {
        id: '3',
        title: "Feugiat",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat. Mauris id fermentum nulla. Maecenas tristique dui odio, at accumsan nunc porta a. Integer pretium eros et metus facilisis iaculis.",
        style: "style3",
        img: "/images/pic03.jpg",
    },
    {
        id: '4',
        title: "Tempus",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
        style: "style4",
        img: "/images/pic04.jpg",
    },
    {
        id: '5',
        title: "Aliquam",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo.",
        style: "style5",
        img: "/images/pic05.jpg",
    }
]

export default function ListPage() {
    const [galleryList, setGalleryList] = useState<GalleryItem[]>(() => {
        // localStorage에서 데이터 불러오기
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('galleryList');
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error('localStorage 파싱 오류:', e);
                }
            } else {
                // localStorage가 비어있으면 초기 데이터 저장
                localStorage.setItem('galleryList', JSON.stringify(initialGalleryList));
            }
        }
        return initialGalleryList;
    });
    const [isUploading, setIsUploading] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [newImageData, setNewImageData] = useState({
        title: '',
        summary: ''
    });

    // 파일을 Base64로 변환하는 함수
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        
        try {
            const styles = ['style1', 'style2', 'style3', 'style4', 'style5'];
            const newItems = [];
            let successCount = 0;
            let failCount = 0;

            // 모든 파일을 순차적으로 처리
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // 파일 타입 검증
                if (!file.type.startsWith('image/')) {
                    console.error(`${file.name}은(는) 이미지 파일이 아닙니다.`);
                    failCount++;
                    continue;
                }

                try {
                    // 파일을 Base64로 변환
                    const base64Image = await fileToBase64(file);
                    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
                    
                    const newItem = {
                        id: `${Date.now()}-${i}`, // 고유 ID 생성
                        title: newImageData.title || `새 이미지 ${i + 1}`,
                        summary: newImageData.summary || '새로 업로드된 이미지입니다.',
                        style: randomStyle,
                        img: base64Image, // Base64 데이터 URL 사용
                    };

                    newItems.push(newItem);
                    successCount++;
                } catch (error) {
                    failCount++;
                    console.error(`파일 ${file.name} 처리 중 오류:`, error);
                }
            }

            // 업로드된 이미지들을 갤러리에 추가
            if (newItems.length > 0) {
                const updatedGalleryList = [...newItems, ...galleryList];
                setGalleryList(updatedGalleryList);
                
                // localStorage에 저장 (선택적)
                try {
                    localStorage.setItem('galleryList', JSON.stringify(updatedGalleryList));
                } catch (error) {
                    console.error('localStorage 저장 실패:', error);
                }
            }

            setShowUploadForm(false);
            setNewImageData({ title: '', summary: '' });
            
            // 결과 메시지
            if (failCount === 0) {
                alert(`${successCount}개의 이미지가 성공적으로 업로드되었습니다!`);
            } else {
                alert(`${successCount}개 성공, ${failCount}개 실패`);
            }

            // 파일 입력 초기화
            e.target.value = '';
        } catch (error) {
            console.error('Upload error:', error);
            alert('이미지 업로드 중 오류가 발생했습니다.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div id="main">
            <div className="inner">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 id="homeTitle">갤러리</h1>
                    
                    <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
                        <DialogTrigger asChild>
                            <button 
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#a7c7e7',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(167, 199, 231, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    lineHeight: '1'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = '#8eb8db';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(167, 199, 231, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = '#a7c7e7';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(167, 199, 231, 0.3)';
                                }}
                            >
                                📷 사진 첨부
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>새 이미지 업로드</DialogTitle>
                                <DialogDescription>
                                    이미지의 제목, 설명을 입력하고 파일을 선택해주세요.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <label htmlFor="title" style={{ fontWeight: '500' }}>제목</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={newImageData.title}
                                        onChange={(e) => setNewImageData({...newImageData, title: e.target.value})}
                                        placeholder="이미지 제목을 입력하세요"
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc'
                                        }}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="summary" style={{ fontWeight: '500' }}>설명</label>
                                    <textarea
                                        id="summary"
                                        value={newImageData.summary}
                                        onChange={(e) => setNewImageData({...newImageData, summary: e.target.value})}
                                        placeholder="이미지 설명을 입력하세요"
                                        rows={3}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="file-upload" style={{ fontWeight: '500' }}>이미지 파일 (여러 개 선택 가능)</label>
                                    <label 
                                        htmlFor="file-upload"
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.75rem 1.5rem',
                                            backgroundColor: '#a7c7e7',
                                            color: 'white',
                                            borderRadius: '6px',
                                            cursor: isUploading ? 'not-allowed' : 'pointer',
                                            opacity: isUploading ? 0.6 : 1,
                                            textAlign: 'center',
                                            fontWeight: '500',
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0 2px 4px rgba(167, 199, 231, 0.3)'
                                        }}
                                        onMouseOver={(e) => {
                                            if (!isUploading) {
                                                e.currentTarget.style.backgroundColor = '#8eb8db';
                                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(167, 199, 231, 0.4)';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = '#a7c7e7';
                                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(167, 199, 231, 0.3)';
                                        }}
                                    >
                                        {isUploading ? '업로드 중...' : '📁 파일 선택 및 업로드'}
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileUpload}
                                        disabled={isUploading}
                                        style={{ display: 'none' }}
                                    />
                                    <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
                                        💡 Ctrl(또는 Cmd) 키를 누른 채로 여러 파일을 선택할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <section className="tiles">
                    {galleryList.map((item, index) => (
                        <article className={item.style} key={`${item.id || item.title}-${index}`}>
                            <span className="image">
                                <img src={item.img} alt=""/>
                            </span>
                            <Link href={`/gallery/${item.id}`}>
                                <h2>{item.title}</h2>
                                <div className="content">
                                    <p>{item.summary}</p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    )
}
