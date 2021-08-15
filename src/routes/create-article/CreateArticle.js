import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../assets/styles/styles.css';
import ButtonComponent from '../../components/button/buttonComponent';
import SLUGS from 'resources/slugs';
import { convertSlugToUrl } from 'resources/utilities';
import { useHistory } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import HtmlParser from 'react-html-parser';

const CreateArticle = () => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState({ 
        title: '', 
        short_desc: '', 
        body: '', 
        photo_url: null,
        created_at: currentDate,  
        created_by: 'Admin',
        updated_at: null
    });
    const { title, short_desc, body, photo_url, created_at, created_by, updated_at } = article;

    const { push } = useHistory();

    async function createArticle()
    {
        await supabase
            .from('trx_articles')
            .insert([
                {
                    title, 
                    short_desc, 
                    body, 
                    photo_url,
                    created_at,  
                    created_by,
                    updated_at
                }
            ]).single();
        console.log(article);
        setArticle({
            title: '', 
            short_desc: '', 
            body: '', 
            photo_url: null,
            created_at: currentDate,  
            created_by: 'Admin',
            updated_at: null
        });

        onClickSave(SLUGS.managementArticles);
    }

    function onClickSave(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    return (
        <div>
            <h2 className='sub-title'>Create Article</h2>
            <div className='separator'></div>
            <div className='row'>
                <div className="form-group row mb-4">
                    <label className="col-md-1 col-form-label">Title</label>
                    <div className="col-md-6">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder='Article Title' 
                        value={title}
                        onChange={(e) => setArticle({ ...article, title: e.target.value})}/>
                    </div>
                </div>
                <div className='col-md-12'>
                    <CKEditor
                            editor={ ClassicEditor }
                            data={body}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setArticle({ ...article, short_desc: data.substring(0, 150), body: data})
                            } }
                        />
                </div>
            </div>

            <button onClick={() => createArticle(article)} className='btn btn-success mt-4 float-end'>
                Simpan
            </button>
        </div>
    );
}

export default CreateArticle;