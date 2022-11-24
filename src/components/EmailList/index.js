import { ArrowDropDown, ChevronLeft, ChevronRight, Inbox, KeyboardHide, LocalOffer, MoreVert, People, Redo, Settings } from '@mui/icons-material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { collection,getDocs } from 'firebase/firestore';
import EmailRow from '../EmailRow';
import Section from '../Section';
import './emailList.css'

function EmailList() {
    const [emails,setEmails] = useState([]);

    useEffect(()=>{
        const querySnapshot = getDocs(collection(db,'emails'));
        querySnapshot.then((querySnapshot)=>{
            setEmails(
                querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        });
    },[])
  return (
    <div className='emailList'>
        <div className='emailList__settings'>
            <div className='emailList__settingsLeft'>
                <IconButton>
                    <CheckBoxOutlineBlankIcon />
                </IconButton>
                <IconButton>
                    <ArrowDropDown />
                </IconButton>
                <IconButton>
                    <Redo />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
            <div className='emailList__settingsRight'>
                <IconButton>
                    <ChevronLeft />
                </IconButton>
                <IconButton>
                    <ChevronRight />
                </IconButton>
                <IconButton>
                    <KeyboardHide />
                </IconButton>
                <IconButton>
                    <Settings />
                </IconButton>
            </div>
        </div>
        <div className='emailList__sections'>
            <Section Icon={Inbox} color='red' title='Primary' selected />
            <Section Icon={People} color='#1A73E8' title='Social' />
            <Section Icon={LocalOffer} color='green' title='Promotions' />
        </div>
        <div className='emailList__list'>
            {emails.map(({id,data:{to,subject,message,timestamp}})=>(
                <EmailRow 
                id={id}
                key={id}
                title={to}
                subject={subject}
                description={message}
                time={new Date(timestamp.seconds * 1000).toUTCString()}
                />
            ))}
            
            
        </div>
    </div>
  )
}

export default EmailList