'use client'

import React from 'react'
import Editor from '@/components/editor/Editor'
import { GetServerSideProps } from 'next'
import { getDocById } from '@/api/docs'
import { Props } from 'next/script'

interface props{
  id: string
}

const EditorPage : React.FC<props>= (props) => {
  return <Editor id  = {props.id} />
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // Fetch data using router.query.id
  const id = context.query.id as string;

  // Pass data to the component as props
  return {
    props: {
      id // Pass id as props
    }
  };
}

export default EditorPage