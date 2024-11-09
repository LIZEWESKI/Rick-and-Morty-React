import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./RelatedCharactersSection.css";
const RelatedCharactersSection = ({ data }) => {
    const { characterData, epCharacters, residents } = data;
    const location = useLocation()
    const spState = location.state?.sp || "";
    const relatedCategories = [
        { label: "Appears in Same Episodes", characters: epCharacters },
        { label: "Residents", characters: residents }
    ];
    return (
        <>
            {relatedCategories.map(category => (
                category.characters.length !== 0 && (
                    <section key={category.label} className="suggested-characters">
                        <h1 className="suggested-characters__title">
                            {category.label === "Residents" 
                                ? `Residents of ${characterData.locationName || "the Same Location"}` 
                                : category.label 
                            }
                        </h1>
                        <div style={{ position: 'relative', marginBottom: '45px' , padding: "10px"}}>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                className="swiper-container"
                                spaceBetween={20}
                                slidesPerView={"auto"}
                                centerInsufficientSlides={true}
                                loop={category.characters.length > 7}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                {category.characters.map((character) => (
                                    <SwiperSlide key={character.id}>
                                        <div className="suggested-characters-card">
                                            <NavLink to={`/characters/${character.id}`} state={{sp : spState }}>
                                                <img 
                                                    src={character.image} 
                                                    alt={character.name} 
                                                    loading="lazy" 
                                                    className="suggested-characters-image" 
                                                />
                                            </NavLink>
                                            <h3 className="suggested-characters-name limit-text-to-1-lines">{character.name}</h3>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </section>
                )
            ))}
        </>
    );
};

export default RelatedCharactersSection;
