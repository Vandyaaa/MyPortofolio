"use client"

import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { supabase } from "./supabaseClient"
import "../styles/blogs/blog.css"
import Footer from "../components/footer"



function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Import lenis dari komponen lain
    import('../components/lenisSc').then((lenisModule) => {
      const lenis = lenisModule.default;
      
      lenis.on('scroll', ({ scroll, limit }) => {
        const scrollProgress = (scroll / limit) * 100;
        setProgress(Math.min(scrollProgress, 100));
      });
    });

    // Fallback untuk browser yang tidak support Lenis
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / scrollHeight) * 100
      setProgress(Math.min(scrollProgress, 100))
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()

    return () => {
      window.removeEventListener("scroll", updateProgress)
    }
  }, [])

  return (
    <div className="con-progress" data-lenis-prevent>
      <p>top</p>
      <div className="scroll-progress-container-vertical">
        <div className="scroll-progress-bar-vertical" style={{ height: `${progress}%` }} />
      </div>
      <p>Bottom</p>
    </div>
  )
}

const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Cek halaman ini!',
          url: window.location.href
        });
        console.log('Berhasil dibagikan');
      } catch (error) {
        console.error('Gagal membagikan', error);
      }
    } else {
      alert('Fitur share tidak didukung di browser ini.');
    }
  };

export default function ArticlePage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Try to get article from navigation state first
    if (location.state?.article) {
      setArticle(location.state.article)
      setIsLoading(false)
    } else if (id) {
      // If no state, fetch from database
      fetchArticle(id)
    } else {
      setError("No article ID provided")
      setIsLoading(false)
    }
  }, [id, location.state])

  async function fetchArticle(articleId) {
    try {
      const { data, error } = await supabase.from("blog").select("*").eq("id", articleId).single()

      if (error) {
        console.error("Failed to fetch article:", error)
        setError("Failed to load article: " + error.message)
      } else if (data) {
        setArticle(data)
      } else {
        setError("Article not found")
      }
    } catch (err) {
      console.error("Error fetching article:", err)
      setError("Error loading article: " + (err.message || String(err)))
    } finally {
      setIsLoading(false)
    }
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  function handleGoBack() {
    navigate(-1)
  }

  if (isLoading) {
    return (
      <div className="body-blog">
        <div className="loading-state">
          <p>Loading Article...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="body-blog">
        <div className="error-state">
          <p>{error}</p>
          <button className="try-again-blog" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="body-blog">
        <div className="error-state">
          <p>Article not found</p>
          <button className="try-again-blog" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    
    <div className="body-blog">
    
      <div className="article-modal-overlay" style={{background: "transparent" }}>
        <div className="article-modal" style={{ border: "none" }}>
          <div className="article-modal-content">
            <aside className="asside-article">
              <div className="asside-main">
                <button className="close-article-btn" onClick={handleGoBack}>
                  <i className="fi fi-rs-arrow-left"></i>
                </button>
                <h1 className="article-modal-title">{article.title_blog || "Judul tidak tersedia"}</h1>
                <div className="author-photo"></div>
                <div className="article-modal-author">
                  <div className="author-info">
                    <p className="author-name">{article.author || "Firdhan Abivandya"}</p>
                    <span> • </span>
                    <p className="publish-date">
                      {article.created_at ? formatDate(article.created_at) : "Tanggal tidak tersedia"}
                    </p>
                  </div>
                </div>
                <button className="sharePage" onClick={handleShare} ><i class="fi fi-rs-share"></i><p> Share</p></button>
              </div>
            </aside>

            <main className="main-article">
              {article.image_url && (
                <div className="article-modal-image">
                  <img
                    src={article.image_url || "/placeholder.svg"}
                    alt={article.title_blog || "Artikel"}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://via.placeholder.com/800x400?text=No+Image"
                    }}
                  />
                </div>
              )}

              <div className="article-modal-text">
                <div className="article-modal-meta">
                  {article.category && (
                    <div className="article-modal-category">
                      <span>{article.category}</span>
                    </div>
                  )}
                </div>

                <div className="article-modal-body">
                  <p
                    className="rendered-html"
                    dangerouslySetInnerHTML={{ __html: article.text_blog || "Konten tidak tersedia" }}
                  ></p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <ScrollProgress/>
      <Footer />
    </div>
  )
}
