import style from './Categories.module.css'
const Categories = () => {
    return ( 
        <>
        
        <div id={style.cards_landscape_wrap_2}>
        <div className={`${style.container} container`}>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                    <a href="">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                    <img src={require("../../../assets/Home/banner-01.jpg")} alt="" />
                                </div>
                                <div className={style.text_container}>                                    
                                    <h6>Title 02</h6>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                    <a href="">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                    <img src={require("../../../assets/Home/banner-02.jpg")} alt="" />
                                </div>

                                <div className={style.text_container}>
                                    <h6>Title 03</h6>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                    <a href="">
                        <div className={style.card_flyer}>
                            <div className={style.text_box}>
                                <div className={style.image_box}>
                                    <img src={require("../../../assets/Home/banner-03.jpg")} alt="" />
                                </div>

                                <div className={style.text_container}>
                                    <h6>Title 03</h6>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>

        
        </>

     );
}
 
export default Categories;