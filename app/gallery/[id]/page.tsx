'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface GalleryItem {
    id: string;
    title: string;
    summary: string;
    style: string;
    img: string;
}

// 예시 데이터 (DB 연동 전 테스트용)
const sampleGalleryList: GalleryItem[] = [
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
];

export default function IdPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [item, setItem] = useState<GalleryItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        
        // localStorage에서 갤러리 데이터 불러오기
        const savedData = localStorage.getItem('galleryList');
        let galleryList = sampleGalleryList; // 기본값으로 예시 데이터 사용
        
        if (savedData) {
            try {
                galleryList = JSON.parse(savedData);
            } catch (e) {
                console.error('데이터 로드 오류:', e);
            }
        }
        
        const foundItem = galleryList.find((item: GalleryItem) => item.id === id);
        setItem(foundItem || null);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div id="main">
                <div className="inner">
                    <p>로딩 중...</p>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div id="main">
                <div className="inner">
                    <h2 id="subTitle">게시물을 찾을 수 없습니다</h2>
                    <p>존재하지 않는 게시물입니다.</p>
                    <button 
                        onClick={() => router.push('/gallery')}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#a7c7e7',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }}
                    >
                        갤러리로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div id="main">
            <div className="inner">
                <button 
                    onClick={() => router.push('/gallery')}
                    style={{
                        backgroundColor: 'transparent',
                        color: '#a7c7e7',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '2rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: 0
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = '#8eb8db';
                        e.currentTarget.style.transform = 'translateX(-3px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = '#a7c7e7';
                        e.currentTarget.style.transform = 'translateX(0)';
                    }}
                >
                    ← Back
                </button>
                
                <article style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ 
                        fontSize: '2.5rem', 
                        marginBottom: '1rem',
                        color: '#2c3e50'
                    }}>
                        {item.title}
                    </h1>
                    
                    <div style={{ 
                        marginBottom: '2rem',
                        color: '#666',
                        fontSize: '0.9rem'
                    }}>
                        게시물 ID: {item.id}
                    </div>

                    <div style={{
                        width: '100%',
                        marginBottom: '2rem',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                        <img 
                            src={item.img} 
                            alt={item.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                    </div>

                    <div style={{
                        backgroundColor: '#f9f9f9',
                        padding: '2rem',
                        borderRadius: '8px',
                        lineHeight: '1.8'
                    }}>
                        <h3 style={{ 
                            marginTop: 0,
                            marginBottom: '1rem',
                            color: '#2c3e50'
                        }}>
                            설명
                        </h3>
                        <p style={{ 
                            fontSize: '1.1rem',
                            color: '#555',
                            margin: 0
                        }}>
                            {item.summary}
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}

