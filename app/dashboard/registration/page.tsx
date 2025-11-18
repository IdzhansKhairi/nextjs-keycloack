"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';

import { Input } from 'antd';
import { Select, Space } from 'antd';

import Swal from 'sweetalert2';
import Image from 'next/image'
import Link from "next/link"

export default function RegistrationPage() {
  return (

    <div>
      <h3 className='text-secondary mb-3'>Guest Registration</h3>

      <div className='row'>
        <div className='col-6'>
          <div className='card'>

            <div className='card-header'>
              <h5 className='p-0 m-0'>Guest Information</h5>
            </div>

            <div className='card-body'>
              <div className='mb-3'>
                <label className='form-label'>Name</label>
                <Input placeholder="Name" />
              </div>
              
              <div className='mb-3'>
                <label className='form-label'>IC / ID / Passport Number</label>
                <Input placeholder="IC / ID / Passport Number" />
              </div>

              <div className='mb-3'>
                <label className='form-label'>Visitor Type</label>
                <Select
                  defaultValue="Select One"
                  className='w-100'
                  options={[
                    { value: 'visitor', label: 'Visitor' },
                    { value: 'contractor', label: 'Contractor' },
                    { value: 'delivery', label: 'Delivery' },
                  ]}
                />
              </div>
              
            </div>

          </div>
        </div>
        <div className='col-6'>
          <div className='card'>

            <div className='card-header'>
              <h5 className='p-0 m-0'>House Information</h5>
            </div>

            <div className='card-body'>
              <div>

                <div className='mb-3'>
                  <label className='form-label'>House Unit</label>
                  <Input placeholder="House Number" />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Street Name</label>
                  <Input placeholder="Street Name" />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Block Name</label>
                  <Input placeholder="Block Name" />
                </div>

              </div>

            </div>
            
          </div>
        </div>
      </div>

      <div className=' mt-4 d-flex justify-content-end'>
        <button className='btn btn-primary'>Submit</button>
      </div>
      
    </div>

  );
}
