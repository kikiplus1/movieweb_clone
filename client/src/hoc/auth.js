
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_action/user_action.'
import {withRouter} from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(SpecificComponent, option, adminRoute = null){
    
    //null = 아무나 출입가능한 페이지
    //true = 로그인한 유저만 출입이 가능한 페이지
    //false = 로그인한 유저는 출입불가능한 페이지

    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response=>{
                console.log(response)

                //로그인하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('./login')
                    }
                }else{
                    if(adminRoute && !response.payload.isAuth){
                        props.history.push('./')

                    } else{
                        if(option === false){
                        props.history.push('./')

                    }
                
                }
            }
            })
            
        }, [])

        return(
            <SpecificComponent {...props}/>
        )
        
    }

    return withRouter(AuthenticationCheck)
}

