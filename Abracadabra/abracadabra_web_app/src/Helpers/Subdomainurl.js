export default function createRedirectURL(homepageURL, subject)
{

    if(homepageURL.startsWith('http://'))
    {
    let url = homepageURL.replace('http://', '');
    url = url.replace('www.','');
    let redirecturl = 'http://' + subject + url;
  
    return redirecturl;
    }
    else if(homepageURL.startsWith('https://'))
    {
      let url = homepageURL.replace('https//', '');
      url = url.replace('www.','');
      let redirecturl = 'https://' + subject + url;
    
      return redirecturl;
    }
}