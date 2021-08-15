import React from 'react';
import { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { supabase } from '../../supabaseClient';
import CardComponent from '../../components/cards/CardComponent';
import ButtonComponent from '../../components/button/buttonComponent';
import '../../assets/styles/styles.css';
import SLUGS from 'resources/slugs';
import { convertSlugToUrl } from 'resources/utilities';
import { useHistory } from 'react-router-dom';
import { theme } from '../../resources/theme';
import EmptyImage from '../../assets/image/empty-image.png';

const ArticlesManagement = () => {
    const [articles, setArticles] = useState([]);
    // const [article, setArticle] = useState({ 
    //     title: '', 
    //     short_desc: '', 
    //     body: '', 
    //     photo_url: null,
    //     created_at: null,  
    //     created_by: '',
    //     updated_at: null
    // });

    const { push } = useHistory();

    useEffect(() => {
        fetchArticles();
    }, []);

    async function fetchArticles() {
        const { data } = await supabase
            .from('trx_articles')
            .select();
        setArticles(data);
    }

    function onClickCreate(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    return (
        <div>
            <h2 className='sub-title'>Article Management</h2>
            <div className='separator'></div>
            <ButtonComponent id='create-button' class='btn btn-success mb-4' text='Create Article' click={() => onClickCreate(SLUGS.createArticle)} />           
            <div className='row'>          
                {
                    articles.map(data => (
                        <div className='col-md-3 mb-5'>
                            <CardComponent 
                            img={data.photo_url == '' || data.photo_url == null ? EmptyImage : data.photo_url} 
                            title={data.title} 
                            body={data.body} 
                            author={data.created_by} 
                            created_at={data.created_at}/>
                        </div>
                    ))
                }    
            </div>
        </div>
    );

}

export default ArticlesManagement;