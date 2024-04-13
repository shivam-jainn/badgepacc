import React from 'react'
import UserInfo from './Components/UserInfo'
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
export default function page() {

    const badge = {
        badgeName:"nice",
        noOfIssued:100,
        hostName:"Shivam",
        issuance_id : "49334i943ifsfi9sfs-fsf",
        link : 'pexels.com'
    }
    const {badgeName,noOfIssued,hostName,issuance_id,link} = badge;
  

  return (
    <section className='px-8 py-8'>
        <UserInfo />

        <div>
            <h1>Hall of fame</h1>
            {/* <CardStack  /> */}
        </div>

        <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <Card className="flex gap-4 max-w-sm p-4">
                <div>
                    <img className='w-[128px] h-[128px] rounded-lg' src="https://images.pexels.com/photos/5827874/pexels-photo-5827874.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                </div>

                <div>
                    <h1>{badgeName}</h1>
                    <h2>{noOfIssued}</h2>
                    <h2>{hostName}</h2>
                </div>

            </Card>

            <Dialog>
  <DialogTrigger>
  <Card className="flex gap-4 max-w-sm p-4" >
                <div>
                    <img className='w-[128px] h-[128px] rounded-lg' src="https://images.pexels.com/photos/5827874/pexels-photo-5827874.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                </div>
                <div>
                    open
                </div>
                <div>
                    <h1>{badgeName}</h1>
                    <h2>{noOfIssued}</h2>
                    <h2>{hostName}</h2>
                </div>

            </Card>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{badgeName}</DialogTitle>
      <DialogDescription className='flex flex-col items-center gap-2' >
        <div>
        <img className='w-[128px] h-[128px] rounded-lg' src="https://images.pexels.com/photos/5827874/pexels-photo-5827874.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
        </div>
        <div className='grid grid-cols-2 grid-rows-2'>
            <span>{hostName}</span>
            <span>{noOfIssued}</span>
            <span>{issuance_id}</span>
        </div>

        <div>
            {link}
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
          


            <Card className="flex gap-4 max-w-sm p-4">
                <div>
                    <img className='w-[128px] h-[128px] rounded-lg' src="https://images.pexels.com/photos/5827874/pexels-photo-5827874.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                </div>

                <div>
                    <h1>{badgeName}</h1>
                    <h2>{noOfIssued}</h2>
                    <h2>{hostName}</h2>
                </div>

            </Card>
        </div>
    </section>
  )
}
