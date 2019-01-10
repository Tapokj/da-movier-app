export const classNames = (vote) => {
  if (vote.toFixed(1) <= 5 ) {
    return 'red_vote'
  }

  else if (vote.toFixed(1) > 5 && vote.toFixed(1) <= 6.9 ) {
    return 'yellow_vote'
  }

  else if (vote.toFixed(1) >= 7 && vote.toFixed(1) <= 10) {
    return 'green_vote'
  }
}
