import React, { Component, useEffect, useState } from 'react';

export default async (message) => {
    // handle your message
    // you can't see this message, because debugger may off when app closed
    // but you can use react native code like fetch, etc ... 
    
    console.log(message); 
    // fetch('http://YOUR_SERVER/api/regist/something')

    return Promise.resolve();
}