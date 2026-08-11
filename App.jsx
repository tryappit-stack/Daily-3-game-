import React, { useState, useMemo } from "react";

/* THE ODDS LAB — simple, friendly CA Daily 3 sandbox.
   Flow: see the vibe -> tap for your number -> read why.
   730 real draws (midday+evening), Aug 2025-Aug 2026. Source: LotteryUSA (verify at calottery.com).
   Every combo 000-999 is 1-in-1,000. A "smart" pick and a random pick have the SAME chance.
   The only thing the story buys you is fun. That's it — and that's enough. */

const SEED = `2025-08-10,e,488
2025-08-11,e,007
2025-08-11,m,036
2025-08-12,e,575
2025-08-12,m,883
2025-08-13,e,451
2025-08-13,m,194
2025-08-14,e,745
2025-08-14,m,758
2025-08-15,e,356
2025-08-15,m,876
2025-08-16,e,422
2025-08-16,m,482
2025-08-17,e,460
2025-08-17,m,692
2025-08-18,e,490
2025-08-18,m,186
2025-08-19,e,849
2025-08-19,m,106
2025-08-20,e,573
2025-08-20,m,237
2025-08-21,e,418
2025-08-21,m,338
2025-08-22,e,907
2025-08-22,m,338
2025-08-23,e,296
2025-08-23,m,786
2025-08-24,e,242
2025-08-24,m,945
2025-08-25,e,582
2025-08-25,m,500
2025-08-26,e,126
2025-08-26,m,456
2025-08-27,e,620
2025-08-27,m,431
2025-08-28,e,417
2025-08-28,m,692
2025-08-29,e,320
2025-08-29,m,781
2025-08-30,e,680
2025-08-30,m,821
2025-08-31,e,839
2025-08-31,m,287
2025-09-01,e,707
2025-09-01,m,369
2025-09-02,e,231
2025-09-02,m,852
2025-09-03,e,559
2025-09-03,m,300
2025-09-04,e,257
2025-09-04,m,336
2025-09-05,e,470
2025-09-05,m,817
2025-09-06,e,722
2025-09-06,m,973
2025-09-07,e,619
2025-09-07,m,978
2025-09-08,e,844
2025-09-08,m,592
2025-09-09,e,399
2025-09-09,m,073
2025-09-10,e,777
2025-09-10,m,531
2025-09-11,e,450
2025-09-11,m,945
2025-09-12,e,022
2025-09-12,m,982
2025-09-13,e,711
2025-09-13,m,058
2025-09-14,e,912
2025-09-14,m,081
2025-09-15,e,892
2025-09-15,m,240
2025-09-16,e,272
2025-09-16,m,640
2025-09-17,e,591
2025-09-17,m,277
2025-09-18,e,521
2025-09-18,m,283
2025-09-19,e,710
2025-09-19,m,895
2025-09-20,e,309
2025-09-20,m,302
2025-09-21,e,627
2025-09-21,m,785
2025-09-22,e,192
2025-09-22,m,076
2025-09-23,e,789
2025-09-23,m,247
2025-09-24,e,256
2025-09-24,m,192
2025-09-25,e,843
2025-09-25,m,111
2025-09-26,e,149
2025-09-26,m,603
2025-09-27,e,707
2025-09-27,m,602
2025-09-28,e,628
2025-09-28,m,662
2025-09-29,e,406
2025-09-29,m,507
2025-09-30,e,328
2025-09-30,m,004
2025-10-01,e,243
2025-10-01,m,036
2025-10-02,e,237
2025-10-02,m,871
2025-10-03,e,752
2025-10-03,m,755
2025-10-04,e,705
2025-10-04,m,750
2025-10-05,e,283
2025-10-05,m,533
2025-10-06,e,696
2025-10-06,m,102
2025-10-07,e,852
2025-10-07,m,923
2025-10-08,e,132
2025-10-08,m,961
2025-10-09,e,620
2025-10-09,m,083
2025-10-10,e,584
2025-10-10,m,375
2025-10-11,e,134
2025-10-11,m,723
2025-10-12,e,853
2025-10-12,m,430
2025-10-13,e,298
2025-10-13,m,542
2025-10-14,e,936
2025-10-14,m,453
2025-10-15,e,161
2025-10-15,m,472
2025-10-16,e,253
2025-10-16,m,087
2025-10-17,e,739
2025-10-17,m,232
2025-10-18,e,218
2025-10-18,m,385
2025-10-19,e,342
2025-10-19,m,879
2025-10-20,e,638
2025-10-20,m,860
2025-10-21,e,884
2025-10-21,m,258
2025-10-22,e,372
2025-10-22,m,856
2025-10-23,e,629
2025-10-23,m,134
2025-10-24,e,483
2025-10-24,m,317
2025-10-25,e,290
2025-10-25,m,962
2025-10-26,e,680
2025-10-26,m,294
2025-10-27,e,183
2025-10-27,m,233
2025-10-28,e,432
2025-10-28,m,939
2025-10-29,e,671
2025-10-29,m,020
2025-10-30,e,340
2025-10-30,m,517
2025-10-31,e,478
2025-10-31,m,981
2025-11-01,e,444
2025-11-01,m,337
2025-11-02,e,526
2025-11-02,m,347
2025-11-03,e,904
2025-11-03,m,580
2025-11-04,e,004
2025-11-04,m,408
2025-11-05,e,767
2025-11-05,m,479
2025-11-06,e,939
2025-11-06,m,762
2025-11-07,e,882
2025-11-07,m,695
2025-11-08,e,150
2025-11-08,m,597
2025-11-09,e,437
2025-11-09,m,102
2025-11-10,e,896
2025-11-10,m,969
2025-11-11,e,577
2025-11-11,m,891
2025-11-12,e,196
2025-11-12,m,546
2025-11-13,e,274
2025-11-13,m,420
2025-11-14,e,677
2025-11-14,m,792
2025-11-15,e,343
2025-11-15,m,227
2025-11-16,e,584
2025-11-16,m,221
2025-11-17,e,302
2025-11-17,m,934
2025-11-18,e,077
2025-11-18,m,973
2025-11-19,e,633
2025-11-19,m,501
2025-11-20,e,400
2025-11-20,m,005
2025-11-21,e,903
2025-11-21,m,123
2025-11-22,e,955
2025-11-22,m,394
2025-11-23,e,298
2025-11-23,m,506
2025-11-24,e,702
2025-11-24,m,070
2025-11-25,e,541
2025-11-25,m,429
2025-11-26,e,742
2025-11-26,m,479
2025-11-27,e,901
2025-11-27,m,060
2025-11-28,e,032
2025-11-28,m,363
2025-11-29,e,837
2025-11-29,m,112
2025-11-30,e,278
2025-11-30,m,339
2025-12-01,e,189
2025-12-01,m,455
2025-12-02,e,362
2025-12-02,m,784
2025-12-03,e,998
2025-12-03,m,259
2025-12-04,e,267
2025-12-04,m,586
2025-12-05,e,778
2025-12-05,m,075
2025-12-06,e,063
2025-12-06,m,236
2025-12-07,e,748
2025-12-07,m,575
2025-12-08,e,505
2025-12-08,m,890
2025-12-09,e,692
2025-12-09,m,681
2025-12-10,e,294
2025-12-10,m,410
2025-12-11,e,976
2025-12-11,m,333
2025-12-12,e,633
2025-12-12,m,370
2025-12-13,e,292
2025-12-13,m,200
2025-12-14,e,778
2025-12-14,m,584
2025-12-15,e,253
2025-12-15,m,434
2025-12-16,e,041
2025-12-16,m,849
2025-12-17,e,096
2025-12-17,m,234
2025-12-18,e,261
2025-12-18,m,839
2025-12-19,e,955
2025-12-19,m,635
2025-12-20,e,359
2025-12-20,m,700
2025-12-21,e,969
2025-12-21,m,839
2025-12-22,e,954
2025-12-22,m,687
2025-12-23,e,337
2025-12-23,m,751
2025-12-24,e,891
2025-12-24,m,958
2025-12-25,e,617
2025-12-25,m,941
2025-12-26,e,578
2025-12-26,m,891
2025-12-27,e,986
2025-12-27,m,816
2025-12-28,e,136
2025-12-28,m,418
2025-12-29,e,850
2025-12-29,m,287
2025-12-30,e,061
2025-12-30,m,362
2025-12-31,e,743
2025-12-31,m,279
2026-01-01,e,215
2026-01-01,m,006
2026-01-02,e,718
2026-01-02,m,130
2026-01-03,e,431
2026-01-03,m,644
2026-01-04,e,104
2026-01-04,m,013
2026-01-05,e,555
2026-01-05,m,730
2026-01-06,e,546
2026-01-06,m,412
2026-01-07,e,738
2026-01-07,m,300
2026-01-08,e,291
2026-01-08,m,194
2026-01-09,e,404
2026-01-09,m,004
2026-01-10,e,535
2026-01-10,m,620
2026-01-11,e,973
2026-01-11,m,642
2026-01-12,e,418
2026-01-12,m,561
2026-01-13,e,717
2026-01-13,m,051
2026-01-14,e,927
2026-01-14,m,827
2026-01-15,e,634
2026-01-15,m,660
2026-01-16,e,964
2026-01-16,m,516
2026-01-17,e,226
2026-01-17,m,370
2026-01-18,e,653
2026-01-18,m,149
2026-01-19,e,609
2026-01-19,m,683
2026-01-20,e,942
2026-01-20,m,023
2026-01-21,e,949
2026-01-21,m,223
2026-01-22,e,969
2026-01-22,m,171
2026-01-23,e,268
2026-01-23,m,862
2026-01-24,e,816
2026-01-24,m,455
2026-01-25,e,067
2026-01-25,m,289
2026-01-26,e,674
2026-01-26,m,877
2026-01-27,e,488
2026-01-27,m,950
2026-01-28,e,820
2026-01-28,m,760
2026-01-29,e,507
2026-01-29,m,441
2026-01-30,e,580
2026-01-30,m,197
2026-01-31,e,372
2026-01-31,m,099
2026-02-01,e,839
2026-02-01,m,584
2026-02-02,e,071
2026-02-02,m,893
2026-02-03,e,901
2026-02-03,m,995
2026-02-04,e,250
2026-02-04,m,120
2026-02-05,e,892
2026-02-05,m,896
2026-02-06,e,410
2026-02-06,m,266
2026-02-07,e,859
2026-02-07,m,995
2026-02-08,e,845
2026-02-08,m,171
2026-02-09,e,511
2026-02-09,m,119
2026-02-10,e,658
2026-02-10,m,151
2026-02-11,e,351
2026-02-11,m,860
2026-02-12,e,737
2026-02-12,m,262
2026-02-13,e,881
2026-02-13,m,742
2026-02-14,e,782
2026-02-14,m,501
2026-02-15,e,068
2026-02-15,m,261
2026-02-16,e,281
2026-02-16,m,043
2026-02-17,e,917
2026-02-17,m,110
2026-02-18,e,766
2026-02-18,m,432
2026-02-19,e,073
2026-02-19,m,366
2026-02-20,e,583
2026-02-20,m,420
2026-02-21,e,817
2026-02-21,m,910
2026-02-22,e,138
2026-02-22,m,282
2026-02-23,e,521
2026-02-23,m,393
2026-02-24,e,678
2026-02-24,m,086
2026-02-25,e,514
2026-02-25,m,900
2026-02-26,e,520
2026-02-26,m,246
2026-02-27,e,000
2026-02-27,m,117
2026-02-28,e,158
2026-02-28,m,481
2026-03-01,e,776
2026-03-01,m,627
2026-03-02,e,195
2026-03-02,m,033
2026-03-03,e,958
2026-03-03,m,796
2026-03-04,e,466
2026-03-04,m,469
2026-03-05,e,079
2026-03-05,m,426
2026-03-06,e,129
2026-03-06,m,526
2026-03-07,e,973
2026-03-07,m,024
2026-03-08,e,785
2026-03-08,m,268
2026-03-09,e,432
2026-03-09,m,438
2026-03-10,e,662
2026-03-10,m,525
2026-03-11,e,616
2026-03-11,m,687
2026-03-12,e,860
2026-03-12,m,827
2026-03-13,e,829
2026-03-13,m,168
2026-03-14,e,566
2026-03-14,m,644
2026-03-15,e,788
2026-03-15,m,116
2026-03-16,e,394
2026-03-16,m,935
2026-03-17,e,930
2026-03-17,m,297
2026-03-18,e,163
2026-03-18,m,254
2026-03-19,e,616
2026-03-19,m,468
2026-03-20,e,633
2026-03-20,m,147
2026-03-21,e,681
2026-03-21,m,293
2026-03-22,e,901
2026-03-22,m,762
2026-03-23,e,187
2026-03-23,m,989
2026-03-24,e,708
2026-03-24,m,206
2026-03-25,e,299
2026-03-25,m,665
2026-03-26,e,610
2026-03-26,m,880
2026-03-27,e,216
2026-03-27,m,590
2026-03-28,e,926
2026-03-28,m,695
2026-03-29,e,591
2026-03-29,m,042
2026-03-30,e,966
2026-03-30,m,263
2026-03-31,e,282
2026-03-31,m,915
2026-04-01,e,048
2026-04-01,m,922
2026-04-02,e,919
2026-04-02,m,056
2026-04-03,e,624
2026-04-03,m,685
2026-04-04,e,536
2026-04-04,m,135
2026-04-05,e,331
2026-04-05,m,308
2026-04-06,e,608
2026-04-06,m,356
2026-04-07,e,099
2026-04-07,m,090
2026-04-08,e,142
2026-04-08,m,798
2026-04-09,e,963
2026-04-09,m,639
2026-04-10,e,314
2026-04-10,m,370
2026-04-11,e,840
2026-04-11,m,623
2026-04-12,e,028
2026-04-12,m,965
2026-04-13,e,034
2026-04-13,m,376
2026-04-14,e,368
2026-04-14,m,281
2026-04-15,e,725
2026-04-15,m,946
2026-04-16,e,761
2026-04-16,m,392
2026-04-17,e,253
2026-04-17,m,801
2026-04-18,e,444
2026-04-18,m,823
2026-04-19,e,438
2026-04-19,m,327
2026-04-20,e,006
2026-04-20,m,266
2026-04-21,e,573
2026-04-21,m,756
2026-04-22,e,940
2026-04-22,m,037
2026-04-23,e,916
2026-04-23,m,316
2026-04-24,e,131
2026-04-24,m,129
2026-04-25,e,401
2026-04-25,m,501
2026-04-26,e,900
2026-04-26,m,366
2026-04-27,e,893
2026-04-27,m,348
2026-04-28,e,574
2026-04-28,m,087
2026-04-29,e,189
2026-04-29,m,109
2026-04-30,e,282
2026-04-30,m,992
2026-05-01,e,351
2026-05-01,m,334
2026-05-02,e,871
2026-05-02,m,041
2026-05-03,e,134
2026-05-03,m,064
2026-05-04,e,489
2026-05-04,m,434
2026-05-05,e,122
2026-05-05,m,104
2026-05-06,e,129
2026-05-06,m,705
2026-05-07,e,123
2026-05-07,m,071
2026-05-08,e,385
2026-05-08,m,500
2026-05-09,e,280
2026-05-09,m,031
2026-05-10,e,343
2026-05-10,m,455
2026-05-11,e,081
2026-05-11,m,262
2026-05-12,e,360
2026-05-12,m,829
2026-05-13,e,427
2026-05-13,m,547
2026-05-14,e,740
2026-05-14,m,326
2026-05-15,e,083
2026-05-15,m,052
2026-05-16,e,711
2026-05-16,m,071
2026-05-17,e,870
2026-05-17,m,008
2026-05-18,e,357
2026-05-18,m,617
2026-05-19,e,408
2026-05-19,m,632
2026-05-20,e,974
2026-05-20,m,541
2026-05-21,e,595
2026-05-21,m,518
2026-05-22,e,076
2026-05-22,m,151
2026-05-23,e,161
2026-05-23,m,576
2026-05-24,e,598
2026-05-24,m,042
2026-05-25,e,282
2026-05-25,m,411
2026-05-26,e,360
2026-05-26,m,696
2026-05-27,e,283
2026-05-27,m,193
2026-05-28,e,754
2026-05-28,m,544
2026-05-29,e,078
2026-05-29,m,892
2026-05-30,e,098
2026-05-30,m,748
2026-05-31,e,364
2026-05-31,m,592
2026-06-01,e,129
2026-06-01,m,601
2026-06-02,e,695
2026-06-02,m,426
2026-06-03,e,369
2026-06-03,m,485
2026-06-04,e,520
2026-06-04,m,734
2026-06-05,e,751
2026-06-05,m,547
2026-06-06,e,256
2026-06-06,m,940
2026-06-07,e,100
2026-06-07,m,785
2026-06-08,e,319
2026-06-08,m,123
2026-06-09,e,733
2026-06-09,m,908
2026-06-10,e,530
2026-06-10,m,813
2026-06-11,e,006
2026-06-11,m,996
2026-06-12,e,090
2026-06-12,m,340
2026-06-13,e,369
2026-06-13,m,632
2026-06-14,e,662
2026-06-14,m,414
2026-06-15,e,587
2026-06-15,m,526
2026-06-16,e,572
2026-06-16,m,149
2026-06-17,e,386
2026-06-17,m,318
2026-06-18,e,647
2026-06-18,m,665
2026-06-19,e,246
2026-06-19,m,567
2026-06-20,e,854
2026-06-20,m,590
2026-06-21,e,270
2026-06-21,m,341
2026-06-22,e,327
2026-06-22,m,204
2026-06-23,e,693
2026-06-23,m,679
2026-06-24,e,889
2026-06-24,m,602
2026-06-25,e,095
2026-06-25,m,075
2026-06-26,e,021
2026-06-26,m,540
2026-06-27,e,178
2026-06-27,m,086
2026-06-28,e,532
2026-06-28,m,695
2026-06-29,e,585
2026-06-29,m,770
2026-06-30,e,745
2026-06-30,m,164
2026-07-01,e,067
2026-07-01,m,416
2026-07-02,e,616
2026-07-02,m,018
2026-07-03,e,169
2026-07-03,m,758
2026-07-04,e,537
2026-07-04,m,770
2026-07-05,e,323
2026-07-05,m,971
2026-07-06,e,484
2026-07-06,m,059
2026-07-07,e,923
2026-07-07,m,606
2026-07-08,e,226
2026-07-08,m,131
2026-07-09,e,081
2026-07-09,m,735
2026-07-10,e,194
2026-07-10,m,721
2026-07-11,e,774
2026-07-11,m,975
2026-07-12,e,251
2026-07-12,m,495
2026-07-13,e,296
2026-07-13,m,828
2026-07-14,e,489
2026-07-14,m,510
2026-07-15,e,697
2026-07-15,m,486
2026-07-16,e,375
2026-07-16,m,910
2026-07-17,e,386
2026-07-17,m,977
2026-07-18,e,733
2026-07-18,m,108
2026-07-19,e,440
2026-07-19,m,019
2026-07-20,e,686
2026-07-20,m,192
2026-07-21,e,717
2026-07-21,m,769
2026-07-22,e,152
2026-07-22,m,463
2026-07-23,e,191
2026-07-23,m,768
2026-07-24,e,984
2026-07-24,m,279
2026-07-25,e,744
2026-07-25,m,261
2026-07-26,e,015
2026-07-26,m,685
2026-07-27,e,315
2026-07-27,m,846
2026-07-28,e,254
2026-07-28,m,799
2026-07-29,e,867
2026-07-29,m,784
2026-07-30,e,049
2026-07-30,m,868
2026-07-31,e,705
2026-07-31,m,307
2026-08-01,e,549
2026-08-01,m,593
2026-08-02,e,877
2026-08-02,m,346
2026-08-03,e,851
2026-08-03,m,076
2026-08-04,e,113
2026-08-04,m,529
2026-08-05,e,969
2026-08-05,m,300
2026-08-06,e,172
2026-08-06,m,469
2026-08-07,e,635
2026-08-07,m,117
2026-08-08,e,997
2026-08-08,m,865
2026-08-09,e,169
2026-08-09,m,716
2026-08-10,m,820`;

function parseSeed(text) {
  return text.trim().split("\n").map((line) => {
    const [date, t, num] = line.split(",").map((s) => s.trim());
    const digits = num.padStart(3, "0").split("").map(Number);
    return { date, time: t === "m" ? "midday" : "evening", str: num.padStart(3, "0"),
             digits, sum: digits.reduce((a, b) => a + b, 0) };
  }).filter((d) => d.digits.length === 3 && d.digits.every((n) => !isNaN(n)));
}

function features(draws) {
  const overall = Array(10).fill(0);
  draws.forEach((d) => d.digits.forEach((x) => overall[x]++));
  const since = Array(10).fill(draws.length);
  for (let dig = 0; dig < 10; dig++)
    for (let i = draws.length - 1, g = 0; i >= 0; i--, g++)
      if (draws[i].digits.includes(dig)) { since[dig] = g; break; }
  const sums = {};
  draws.forEach((d) => { sums[d.sum] = (sums[d.sum] || 0) + 1; });
  const commonSums = new Set(Object.entries(sums).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([s]) => +s));
  const idx = [...overall.keys()];
  const hot = [...idx].sort((a, b) => overall[b] - overall[a]).slice(0, 3);
  const cold = [...idx].sort((a, b) => overall[a] - overall[b]).slice(0, 3);
  const overdue = [...idx].sort((a, b) => since[b] - since[a]).slice(0, 3);
  return { overall, since, hot, cold, overdue, commonSums, n: draws.length };
}

function pickOne(draws) {
  const f = features(draws);
  const pool = [...new Set([...f.hot, ...f.overdue, ...Array(10).keys()])];
  let best = null;
  for (let k = 0; k < 400; k++) {
    let s = ""; for (let i = 0; i < 3; i++) s += pool[Math.floor(Math.random() * pool.length)];
    const digs = s.split("").map(Number);
    const maxF = Math.max(...f.overall) * 3, maxS = Math.max(...f.since) * 3 || 1;
    const freq = digs.reduce((a, d) => a + f.overall[d], 0) / maxF;
    const over = digs.reduce((a, d) => a + f.since[d], 0) / maxS;
    const sum = digs.reduce((a, b) => a + b, 0);
    const sumc = f.commonSums.has(sum) ? 1 : 0;
    const u = new Set(digs).size, patt = u === 3 ? 1 : u === 2 ? 0.5 : 0;
    const score = 0.4 * freq + 0.2 * over + 0.25 * sumc + 0.15 * patt;
    if (!best || score > best.score) best = { num: s, digs, sum, score, u };
  }
  // build friendly story
  const story = [];
  const hotIn = best.digs.filter((d) => f.hot.includes(d));
  const overIn = best.digs.filter((d) => f.overdue.includes(d));
  if (hotIn.length) story.push(`${hotIn.join(" & ")} ${hotIn.length > 1 ? "have" : "has"} shown up often lately`);
  if (overIn.length) story.push(`${overIn.join(" & ")} ${overIn.length > 1 ? "are" : "is"} overdue for a comeback`);
  if (f.commonSums.has(best.sum)) story.push(`the digits add to ${best.sum}, a common total`);
  story.push(best.u === 3 ? "all three digits are different" : best.u === 2 ? "it has a matching pair" : "it's a rare triple");
  return { ...best, story };
}


function boxInfo(num) {
  const digs = num.split("").map(Number);
  const u = new Set(digs).size;
  // permutations (unique)
  const perms = new Set();
  const [a, b, c] = digs;
  [[a,b,c],[a,c,b],[b,a,c],[b,c,a],[c,a,b],[c,b,a]].forEach((p) => perms.add(p.join("")));
  const ways = perms.size; // 6, 3, or 1
  const kind = ways === 6 ? "6-way box" : ways === 3 ? "3-way box" : "triple (straight only)";
  const boxOdds = ways === 6 ? "1 in 167" : ways === 3 ? "1 in 333" : "1 in 1,000";
  return { ways, kind, boxOdds, combos: [...perms].sort() };
}

function checkAgainst(myNum, draws) {
  if (myNum.length !== 3 || !draws.length) return null;
  const latest = draws[draws.length - 1];
  const straight = myNum === latest.str;
  const box = myNum.split("").sort().join("") === latest.str.split("").sort().join("");
  return { latest, straight, box };
}

function fmtDate(iso) {
  // iso "2026-08-11" -> "August 11, 2026"
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  if (!y || !m || !d) return iso;
  return `${months[m - 1]} ${d}, ${y}`;
}

const SCOPES = { evening: "Evening", midday: "Midday", combined: "Both draws" };

export default function App() {
  const [seedText, setSeedText] = useState(SEED);
  const [scope, setScope] = useState("evening");
  const [pick, setPick] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("evening");
  const [newNum, setNewNum] = useState("");
  const [showData, setShowData] = useState(false);
  const [myNum, setMyNum] = useState("");
  const [checkResult, setCheckResult] = useState(null);
  const [bets, setBets] = useState([]);
  const [betNum, setBetNum] = useState("");
  const [betAmt, setBetAmt] = useState("1");
  const [betWon, setBetWon] = useState("");

  const all = useMemo(() => parseSeed(seedText), [seedText]);
  const draws = useMemo(() => scope === "combined" ? all : all.filter((d) => d.time === scope), [all, scope]);
  const f = useMemo(() => features(draws), [draws]);
  const todayStr = new Date().toISOString().slice(0, 10);
  const latestDraw = draws.length ? draws[draws.length - 1] : null;
  const isStale = latestDraw ? latestDraw.date < todayStr : true;
  const counts = { evening: all.filter(d=>d.time==="evening").length, midday: all.filter(d=>d.time==="midday").length };
  const maxFreq = Math.max(...f.overall);
  const recent = useMemo(() => [...draws].slice(-5).reverse(), [draws]);

  const roll = () => {
    setRolling(true); setPick(null);
    let n = 0;
    const iv = setInterval(() => {
      setPick({ num: String(Math.floor(Math.random() * 1000)).padStart(3, "0"), spinning: true });
      if (++n > 8) { clearInterval(iv); setPick(pickOne(draws)); setRolling(false); }
    }, 70);
  };

  const addDraw = (useToday) => {
    const n = newNum.replace(/\D/g, "");
    const date = useToday ? todayStr : newDate;
    if (n.length !== 3 || !date) return;
    setSeedText((s) => `${date},${newTime === "midday" ? "m" : "e"},${n}\n` + s);
    setNewNum(""); setCheckResult(null);
  };
  const fillToday = () => setNewDate(todayStr);
  // delete a specific draw line (by its exact "date,t,num" string)
  const deleteDrawLine = (lineStr) => {
    setSeedText((s) => s.split("\n").filter((ln) => ln.trim() !== lineStr).join("\n"));
    setCheckResult(null);
  };
  // recent raw lines (newest first) for the editable list
  const rawLines = seedText.trim().split("\n")
    .filter((l) => l.trim())
    .sort((a, b) => (b.split(",")[0] > a.split(",")[0] ? 1 : b.split(",")[0] < a.split(",")[0] ? -1 : 0))
    .slice(0, 8);
  const logBet = () => {
    const n = betNum.replace(/\D/g, "");
    const amt = parseFloat(betAmt) || 0;
    const won = parseFloat(betWon) || 0;
    if (n.length !== 3 || amt <= 0) return;
    setBets((b) => [{ date: todayStr, num: n, amt, won, id: Date.now() }, ...b]);
    setBetNum(""); setBetWon("");
  };
  const delBet = (id) => setBets((b) => b.filter((x) => x.id !== id));
  const totals = bets.reduce((a, x) => ({ spent: a.spent + x.amt, won: a.won + x.won }), { spent: 0, won: 0 });
  const net = totals.won - totals.spent;

  return (
    <div className="lab">
      <style>{CSS}</style>

      <header className="top">
        <h1>The Odds Lab</h1>
        <p className="tag">California Daily 3 &middot; a fun way to pick your numbers</p>
      </header>

      {/* STEP 1 — the vibe / stats */}
      <section className="card">
        <div className="step big-step"><span className="rn">I</span> The mood of the numbers</div>
        <div className="scope">
          {Object.keys(SCOPES).map((s) => (
            <button key={s} className={scope === s ? "sc on" : "sc"} onClick={() => { setScope(s); setPick(null); }}>
              {SCOPES[s]}{s !== "combined" ? ` (${counts[s]})` : ` (${all.length})`}
            </button>
          ))}
        </div>

        <div className="moodgrid">
          <div className="mood hot">
            <span className="mood-lab">Shows up most</span>
            <span className="mood-nums">{f.hot.join(" · ")}</span>
            <span className="mood-sub">over all history</span>
          </div>
          <div className="mood cold">
            <span className="mood-lab">Shows up least</span>
            <span className="mood-nums">{f.cold.join(" · ")}</span>
            <span className="mood-sub">over all history</span>
          </div>
          <div className="mood due">
            <span className="mood-lab">Longest unseen</span>
            <span className="mood-nums">{f.overdue.join(" · ")}</span>
            <span className="mood-sub">gap since last draw</span>
          </div>
        </div>

        <p className="mythbust">Fun to watch — but remember: a digit being &ldquo;least seen&rdquo; or &ldquo;longest unseen&rdquo; does <b>not</b> make it due. Every draw starts fresh.</p>

        <details className="chartwrap">
          <summary>See the full chart</summary>
          <div className="freqs">
            {f.overall.map((v, dig) => (
              <div className="freq-row" key={dig}>
                <span className="digit">{dig}</span>
                <span className="bar-track"><span className="bar-fill" style={{ width: `${(v / maxFreq) * 100}%`,
                  background: f.hot.includes(dig) ? "var(--hot)" : f.cold.includes(dig) ? "var(--cold)" : "var(--bar)" }} /></span>
                <span className="freq-n">{v}</span>
              </div>
            ))}
          </div>
          <p className="chart-note">If the game is fair, every digit should land near <b>{Math.round(draws.length*3/10)}</b>. The wiggle you see is just luck, and it flattens out the more draws you add.</p>
        </details>

        <div className="recent">
          <span className="recent-lab">Last 5 {scope === "combined" ? "" : scope}:</span>
          {recent.map((d, i) => <span key={i} className="chip-num">{d.str}</span>)}
        </div>
      </section>

      {/* STEP 2 — the pick */}
      <section className="card pickcard">
        <div className="step big-step"><span className="rn">II</span> Your number</div>
        <div className={"bignum" + (pick && pick.spinning ? " spin" : "")}>
          {pick ? pick.num : "— — —"}
        </div>
        <button className="rollbtn" onClick={roll} disabled={rolling}>
          {rolling ? "rolling…" : pick ? "Pick another" : "Pick my number"}
        </button>

        {pick && !pick.spinning && (
          <div className="why">
            <div className="why-h">Why this number</div>
            <ul>{pick.story.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        )}

        {pick && !pick.spinning && (() => {
          const b = boxInfo(pick.num);
          return (
            <div className="boxplay">
              <div className="box-h">How you could play it</div>
              <div className="box-tag">{b.kind} &middot; box odds {b.boxOdds}</div>
              <div className="box-rows">
                <div className="box-row"><span>Straight (exact order)</span><span className="bo">1 in 1,000</span><span className="bp">big payout</span></div>
                <div className="box-row"><span>Box (any order)</span><span className="bo">{b.boxOdds}</span><span className="bp">smaller payout</span></div>
                <div className="box-row"><span>Straight/Box (both)</span><span className="bo">{b.boxOdds}</span><span className="bp">big if exact, small if scrambled</span></div>
              </div>
              {b.ways > 1 && (
                <div className="combos">
                  <span className="combos-lab">Box wins if it&rsquo;s drawn as:</span>
                  <span className="combos-list">{b.combos.map((c) => <span key={c} className="combo">{c}</span>)}</span>
                </div>
              )}
              <p className="box-note">Plain version: <b>Straight</b> = exact order, hardest, biggest prize. <b>Box</b> = any order, easier, smaller prize. <b>Straight/Box</b> = your $1 split in two, so you win big if it&rsquo;s exact or small if it&rsquo;s scrambled (each half pays about half). None of them beat the odds — easier wins just pay less. Verify current payouts at calottery.com.</p>
            </div>
          );
        })()}

        <p className="fairnote">
          Fun fact worth remembering: this number has the exact same chance as any random pick — <b>1 in 1,000</b>.
          The story just makes it more fun than a faceless Quick Pick. 🎲
        </p>
      </section>

      {/* Play your own / check a number */}
      <section className="card">
        <div className="step big-step"><span className="rn">III</span> Play your own number</div>
        <p className="own-sub">Type any 3 digits to see what kind of box it is, your best odds, and whether it would have won the latest {scope === "combined" ? "" : scope} draw.</p>
        <div className="own-row">
          <input className="ownin" placeholder="4 8 0" maxLength={3} value={myNum}
            onChange={(e) => { setMyNum(e.target.value.replace(/\D/g, "")); setCheckResult(null); }} />
          <button className="own-btn" disabled={myNum.length !== 3}
            onClick={() => setCheckResult(checkAgainst(myNum, draws))}>Check it</button>
        </div>

        {isStale && latestDraw && (
          <div className="stale-warn">
            ⚠ Your newest {scope === "combined" ? "" : scope} draw on file is <b>{latestDraw.str}</b> from <b>{fmtDate(latestDraw.date)}</b>, not today. The check below uses that draw. Add today&rsquo;s result in the next step for an accurate check.
          </div>
        )}

        {myNum.length === 3 && (() => {
          const b = boxInfo(myNum);
          return (
            <div className="own-out">
              <div className="own-kind">{myNum} is a <b>{b.kind}</b></div>
              <div className="own-odds">
                <div className="oo"><span className="oo-t">Straight</span><span className="oo-o">1 in 1,000</span><span className="oo-n">exact order &middot; biggest prize</span></div>
                <div className="oo best"><span className="oo-t">Box (best chance)</span><span className="oo-o">{b.boxOdds}</span><span className="oo-n">{b.ways === 6 ? "any of 6 orders" : b.ways === 3 ? "any of 3 orders" : "triple — straight only"}</span></div>
              </div>
              {b.ways > 1 && (
                <div className="own-combos">Box wins if drawn as: {b.combos.map((c) => <span key={c} className="combo">{c}</span>)}</div>
              )}
            </div>
          );
        })()}

        {checkResult && (
          <div className={"check-banner " + (checkResult.straight ? "win-big" : checkResult.box ? "win-box" : "no-win")}>
            {checkResult.straight
              ? `🎉 STRAIGHT WIN! ${myNum} exactly matches the latest draw (${checkResult.latest.str}, ${fmtDate(checkResult.latest.date)}).`
              : checkResult.box
              ? `✓ BOX WIN — same digits, different order. Latest draw was ${checkResult.latest.str} (${fmtDate(checkResult.latest.date)}). A box play would have won; a straight would not.`
              : `No win against the latest draw (${checkResult.latest.str}, ${fmtDate(checkResult.latest.date)}). That's the usual outcome — it's a 1-in-1,000 game.`}
          </div>
        )}

        <p className="own-honest">Your <b>best chance of winning something</b> is a 6-way box at 1 in 167 — but heads-up: easier wins pay proportionally less, so &ldquo;win more often&rdquo; doesn&rsquo;t mean &ldquo;come out ahead.&rdquo; The house edge is the same either way. See official odds &amp; prizes at <a href="https://www.calottery.com/draw-games/daily-3" target="_blank" rel="noopener">calottery.com</a>.</p>
      </section>

      {/* STEP 3 — keep it fresh */}
      <section className="card">
        <div className="step big-step"><span className="rn">IV</span> Add the latest draw {isStale ? "" : "✓"}</div>
        <p className="own-sub">Enter tonight&rsquo;s winning number so the checker above stays accurate. One tap uses today&rsquo;s date for you.</p>
        <div className="fresh-row">
          <select value={newTime} onChange={(e) => setNewTime(e.target.value)}>
            <option value="evening">Evening</option><option value="midday">Midday</option>
          </select>
          <input className="numin" placeholder="169" maxLength={3} value={newNum} onChange={(e) => setNewNum(e.target.value.replace(/\D/g, ""))} />
          <button className="add big-add" onClick={() => addDraw(true)} disabled={newNum.length !== 3}>Add today&rsquo;s draw</button>
        </div>
        <details className="other-date">
          <summary>Add for a different date instead</summary>
          <div className="adder-row">
            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <button className="add" onClick={() => addDraw(false)} disabled={newNum.length !== 3 || !newDate}>Add for this date</button>
          </div>
        </details>
        <div className="recent-edit">
          <div className="re-h">Recent entries — tap ✕ to remove a wrong one</div>
          {rawLines.map((ln) => {
            const [d, t, num] = ln.split(",");
            if (!num) return null;
            return (
              <div className="re-row" key={ln}>
                <span className="re-date">{fmtDate(d)}</span>
                <span className={"re-tag " + (t === "m" ? "midday" : "evening")}>{t === "m" ? "MIDDAY" : "EVENING"}</span>
                <span className="re-num">{num}</span>
                <button className="re-del" onClick={() => deleteDrawLine(ln)} aria-label="remove">✕</button>
              </div>
            );
          })}
          <p className="re-note">Wrong number? Remove it here, then add the correct one above.</p>
        </div>

        <button className="datalink" onClick={() => setShowData((v) => !v)}>{showData ? "Hide" : "View / edit"} all {all.length} draws</button>
        {showData && (
          <>
            <p className="hint">One per line: <code>YYYY-MM-DD,e,169</code> (e = evening, m = midday). To save new draws permanently, copy this into your project file.</p>
            <textarea value={seedText} onChange={(e) => setSeedText(e.target.value)} spellCheck={false} />
          </>
        )}
      </section>

      {/* STEP V — bet tracker */}
      <section className="card">
        <div className="step big-step"><span className="rn">V</span> Track your play</div>
        <p className="own-sub">Log what you actually bet and won. It keeps an honest running tally so you can see the real bottom line over time.</p>

        <div className="bet-inputs">
          <div className="bet-field"><label>Number</label>
            <input className="bnum" placeholder="169" maxLength={3} value={betNum} onChange={(e) => setBetNum(e.target.value.replace(/\D/g, ""))} /></div>
          <div className="bet-field"><label>Bet $</label>
            <input className="bamt" type="number" min="0" step="0.5" value={betAmt} onChange={(e) => setBetAmt(e.target.value)} /></div>
          <div className="bet-field"><label>Won $</label>
            <input className="bamt" type="number" min="0" step="1" placeholder="0" value={betWon} onChange={(e) => setBetWon(e.target.value)} /></div>
          <button className="add bet-add" onClick={logBet} disabled={betNum.length !== 3}>Log it</button>
        </div>

        {bets.length > 0 && (
          <>
            <div className="ledger">
              {bets.map((b) => (
                <div className="led-row" key={b.id}>
                  <span className="led-date">{fmtDate(b.date)}</span>
                  <span className="led-num">{b.num}</span>
                  <span className="led-bet">-${b.amt.toFixed(2)}</span>
                  <span className={"led-won " + (b.won > 0 ? "pos" : "")}>{b.won > 0 ? `+$${b.won.toFixed(2)}` : "—"}</span>
                  <button className="re-del" onClick={() => delBet(b.id)} aria-label="remove">✕</button>
                </div>
              ))}
            </div>
            <div className="tally">
              <div className="tal"><span className="tal-l">Total bet</span><span className="tal-v neg">-${totals.spent.toFixed(2)}</span></div>
              <div className="tal"><span className="tal-l">Total won</span><span className="tal-v pos">+${totals.won.toFixed(2)}</span></div>
              <div className="tal big"><span className="tal-l">Bottom line</span><span className={"tal-v " + (net >= 0 ? "pos" : "neg")}>{net >= 0 ? "+" : "-"}${Math.abs(net).toFixed(2)}</span></div>
            </div>
            <p className="tally-note">Over time this number tends to drift negative — that&rsquo;s the house edge, not bad luck. Seeing it plainly is the honest point of the tracker.</p>
          </>
        )}
        <p className="re-note">Note: this log lives in your browser for this session. To keep a permanent record, jot the bottom line somewhere before closing.</p>
      </section>

      <footer className="foot">
        <p>For fun only. Every combination 000–999 has the same 1-in-1,000 chance every draw — this tool doesn&rsquo;t improve your odds or predict anything. Not gambling or financial advice. Play within your means. Data from an unofficial mirror; verify at calottery.com.</p>
        <p className="hotline">Problem gambling? Call 1-800-GAMBLER.</p>
      </footer>
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900&family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@400;500;600&display=swap');
  * { box-sizing:border-box; margin:0; padding:0; }
  .lab { --ink:#0b0f14; --card:#141b25; --line:#26313f; --fg:#eef4f8; --mut:#8797a8; --bar:#3a4a5e; --hot:#37d9c4; --cold:#e8a13a; --due:#8b93ff; --signal:#37d9c4;
    background:var(--ink); color:var(--fg); font-family:'Inter',sans-serif; min-height:100vh; padding:clamp(16px,4vw,40px); max-width:720px; margin:0 auto; }
  .top { text-align:center; margin-bottom:24px; }
  h1 { font-family:'Fraunces',serif; font-weight:900; font-size:clamp(38px,9vw,64px); letter-spacing:-.02em; }
  .tag { color:var(--mut); margin-top:8px; font-size:15px; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:16px; padding:clamp(18px,4vw,26px); margin-bottom:16px; }
  .step { font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:var(--signal); margin-bottom:16px; }
  .big-step { display:flex; align-items:center; gap:12px; font-size:18px; letter-spacing:.04em; text-transform:none; }
  .rn { display:inline-flex; align-items:center; justify-content:center; min-width:44px; height:44px; padding:0 10px; border:2px solid var(--signal); border-radius:12px; font-size:24px; font-weight:600; color:var(--signal); letter-spacing:0; }
  .scope { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px; }
  .sc { flex:1; min-width:90px; background:transparent; border:1px solid var(--line); color:var(--mut); border-radius:10px; padding:11px 8px; font-size:14px; cursor:pointer; font-family:inherit; transition:.15s; }
  .sc:hover { border-color:var(--signal); color:var(--fg); }
  .sc.on { background:var(--signal); border-color:var(--signal); color:#04110f; font-weight:600; }
  .moodgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:18px; }
  @media(max-width:520px){ .moodgrid{ grid-template-columns:1fr; } }
  .mood { background:#0d141c; border:1px solid var(--line); border-radius:12px; padding:14px; text-align:center; display:flex; flex-direction:column; gap:5px; }
  .mood.hot { border-top:3px solid var(--hot); } .mood.cold { border-top:3px solid var(--cold); } .mood.due { border-top:3px solid var(--due); }
  .mood-lab { font-size:12px; color:var(--mut); text-transform:uppercase; letter-spacing:.08em; }
  .mood-nums { font-family:'IBM Plex Mono',monospace; font-size:26px; font-weight:600; letter-spacing:.04em; white-space:nowrap; }
  .mood.hot .mood-nums { color:var(--hot); } .mood.cold .mood-nums { color:var(--cold); } .mood.due .mood-nums { color:var(--due); }
  .mood-sub { font-size:11px; color:var(--mut); }
  .chartwrap { margin-bottom:16px; }
  .chartwrap summary { cursor:pointer; font-size:13px; color:var(--signal); font-family:'IBM Plex Mono',monospace; }
  .freqs { display:flex; flex-direction:column; gap:6px; margin-top:14px; }
  .freq-row { display:grid; grid-template-columns:16px 1fr 32px; align-items:center; gap:10px; }
  .digit { font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--mut); }
  .bar-track { height:12px; background:#0a1017; border-radius:3px; overflow:hidden; }
  .bar-fill { display:block; height:100%; border-radius:3px; transition:width .5s ease; }
  .freq-n { font-family:'IBM Plex Mono',monospace; font-size:12px; text-align:right; }
  .chart-note { font-size:12.5px; color:var(--mut); line-height:1.5; margin-top:12px; } .chart-note b { color:var(--cold); }
  .recent { display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding-top:14px; border-top:1px solid var(--line); }
  .recent-lab { font-size:12px; color:var(--mut); text-transform:capitalize; }
  .chip-num { font-family:'IBM Plex Mono',monospace; font-size:14px; background:#0d141c; border:1px solid var(--line); border-radius:6px; padding:4px 9px; letter-spacing:.08em; }
  .pickcard { text-align:center; }
  .bignum { font-family:'IBM Plex Mono',monospace; font-weight:600; font-size:clamp(64px,20vw,110px); letter-spacing:.08em; line-height:1.1; color:var(--signal); margin:6px 0 18px; }
  .bignum.spin { color:var(--mut); opacity:.7; }
  .rollbtn { background:var(--signal); border:none; color:#04110f; font-weight:700; font-size:17px; padding:15px 34px; border-radius:12px; cursor:pointer; font-family:inherit; transition:.15s; }
  .rollbtn:hover:not(:disabled) { filter:brightness(1.08); transform:translateY(-1px); }
  .rollbtn:disabled { opacity:.6; cursor:default; }
  .why { text-align:left; background:#0d141c; border:1px solid var(--line); border-radius:12px; padding:16px 18px; margin-top:20px; }
  .why-h { font-size:13px; color:var(--signal); font-weight:600; margin-bottom:8px; }
  .why ul { list-style:none; display:flex; flex-direction:column; gap:6px; }
  .why li { font-size:14px; color:var(--fg); padding-left:18px; position:relative; line-height:1.4; }
  .why li:before { content:"→"; position:absolute; left:0; color:var(--signal); }
  .fairnote { font-size:13px; color:var(--mut); line-height:1.55; margin-top:18px; max-width:46ch; margin-left:auto; margin-right:auto; } .fairnote b { color:var(--fg); }
  .adder-row { display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:14px; }
  .adder-row input, .adder-row select { background:#0d141c; border:1px solid var(--line); color:var(--fg); border-radius:9px; padding:10px 12px; font-family:'IBM Plex Mono',monospace; font-size:14px; }
  .numin { width:76px; text-align:center; letter-spacing:.2em; }
  .add { background:var(--signal); border:none; color:#04110f; font-weight:600; padding:10px 20px; border-radius:9px; cursor:pointer; font-family:inherit; }
  .add:disabled { opacity:.4; cursor:not-allowed; }
  .datalink { background:none; border:none; color:var(--signal); font-family:'IBM Plex Mono',monospace; font-size:13px; cursor:pointer; padding:0; }
  .hint { font-size:12px; color:var(--mut); margin:12px 0 6px; } code { font-family:'IBM Plex Mono',monospace; color:var(--fg); }
  textarea { width:100%; height:150px; background:#0d141c; border:1px solid var(--line); border-radius:8px; color:var(--fg); font-family:'IBM Plex Mono',monospace; font-size:12px; padding:10px; resize:vertical; }
  .foot { color:var(--mut); font-size:12px; line-height:1.6; text-align:center; padding:14px 0 4px; max-width:60ch; margin:0 auto; }
  .foot p { margin-bottom:8px; }
  .hotline { font-family:'IBM Plex Mono',monospace; color:var(--cold); }
  .boxplay { text-align:left; background:#0d141c; border:1px solid var(--line); border-radius:12px; padding:16px 18px; margin-top:14px; }
  .box-h { font-size:13px; color:var(--signal); font-weight:600; margin-bottom:6px; }
  .box-tag { font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--due); margin-bottom:12px; }
  .box-rows { display:flex; flex-direction:column; gap:6px; margin-bottom:12px; }
  .box-row { display:grid; grid-template-columns:1.4fr 1fr 1fr; gap:8px; font-size:13px; align-items:center; }
  .box-row .bo { font-family:'IBM Plex Mono',monospace; color:var(--fg); } .box-row .bp { color:var(--mut); font-size:12px; }
  .combos { display:flex; flex-direction:column; gap:6px; margin-bottom:12px; }
  .combos-lab { font-size:12px; color:var(--mut); }
  .combos-list { display:flex; flex-wrap:wrap; gap:6px; }
  .combo { font-family:'IBM Plex Mono',monospace; font-size:13px; background:#141b25; border:1px solid var(--line); border-radius:6px; padding:3px 8px; letter-spacing:.06em; }
  .box-note { font-size:12px; color:var(--mut); line-height:1.5; }


  .stale-warn { background:rgba(232,161,58,.13); border:1px solid var(--cold); color:#f0c07a; border-radius:12px; padding:14px 16px; margin-bottom:14px; font-size:15px; line-height:1.55; }
  .stale-warn b { color:#fff; }
  .fresh-row { display:flex; gap:10px; flex-wrap:wrap; align-items:stretch; margin-bottom:12px; }
  .fresh-row select { background:#0d141c; border:1px solid var(--line); color:var(--fg); border-radius:10px; padding:14px; font-family:'IBM Plex Mono',monospace; font-size:16px; min-height:56px; }
  .big-add { flex:1; min-width:180px; font-size:18px; min-height:56px; }
  .other-date { margin-bottom:12px; }
  .other-date summary { cursor:pointer; font-size:14px; color:var(--mut); font-family:'IBM Plex Mono',monospace; padding:6px 0; }
  .other-date .adder-row { margin-top:10px; }


  /* editable recent list (#4) */
  .recent-edit { margin:6px 0 14px; }
  .re-h { font-size:13px; color:var(--mut); margin-bottom:10px; }
  .re-row { display:grid; grid-template-columns:auto auto 1fr auto; align-items:center; gap:10px; padding:10px 12px; background:#0d141c; border:1px solid var(--line); border-radius:8px; margin-bottom:6px; }
  .re-date { font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--mut); }
  .re-tag { font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600; letter-spacing:.08em; padding:4px 9px; border-radius:6px; text-align:center; }
  .re-tag.midday { background:rgba(232,161,58,.16); color:var(--cold); border:1px solid rgba(232,161,58,.4); }
  .re-tag.evening { background:rgba(55,217,196,.14); color:var(--hot); border:1px solid rgba(55,217,196,.4); }
  .re-num { font-family:'IBM Plex Mono',monospace; font-size:18px; letter-spacing:.1em; text-align:right; }
  .re-del { background:transparent; border:1px solid var(--line); color:var(--cold); border-radius:8px; width:36px; height:36px; font-size:16px; cursor:pointer; }
  .re-del:hover { border-color:var(--cold); background:rgba(232,161,58,.1); }
  .re-note { font-size:12.5px; color:var(--mut); margin-top:8px; line-height:1.5; }

  /* bet tracker (#2) */
  .bet-inputs { display:flex; gap:10px; flex-wrap:wrap; align-items:flex-end; margin-bottom:16px; }
  .bet-field { display:flex; flex-direction:column; gap:5px; }
  .bet-field label { font-size:12px; color:var(--mut); text-transform:uppercase; letter-spacing:.06em; }
  .bnum { width:100px; background:#0d141c; border:1px solid var(--line); color:var(--fg); border-radius:10px; padding:13px; font-family:'IBM Plex Mono',monospace; font-size:20px; text-align:center; letter-spacing:.15em; }
  .bamt { width:92px; background:#0d141c; border:1px solid var(--line); color:var(--fg); border-radius:10px; padding:13px; font-family:'IBM Plex Mono',monospace; font-size:18px; text-align:center; }
  .bet-add { min-height:52px; }
  .ledger { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
  .led-row { display:grid; grid-template-columns:auto auto 1fr 1fr auto; align-items:center; gap:10px; padding:10px 12px; background:#0d141c; border:1px solid var(--line); border-radius:8px; }
  .led-date { font-family:'IBM Plex Mono',monospace; font-size:12.5px; color:var(--mut); }
  .led-num { font-family:'IBM Plex Mono',monospace; font-size:16px; letter-spacing:.08em; }
  .led-bet { font-family:'IBM Plex Mono',monospace; font-size:14px; color:var(--cold); text-align:right; }
  .led-won { font-family:'IBM Plex Mono',monospace; font-size:14px; color:var(--mut); text-align:right; }
  .led-won.pos { color:var(--hot); }
  .tally { display:flex; flex-direction:column; gap:8px; background:#0d141c; border:1px solid var(--line); border-radius:12px; padding:16px 18px; margin-bottom:12px; }
  .tal { display:flex; justify-content:space-between; align-items:center; }
  .tal-l { font-size:15px; color:var(--mut); }
  .tal-v { font-family:'IBM Plex Mono',monospace; font-size:17px; font-weight:600; }
  .tal-v.pos { color:var(--hot); } .tal-v.neg { color:var(--cold); }
  .tal.big { border-top:1px solid var(--line); padding-top:12px; margin-top:4px; }
  .tal.big .tal-l { font-size:17px; color:var(--fg); font-weight:600; }
  .tal.big .tal-v { font-size:24px; }
  .tally-note { font-size:13px; color:var(--mut); line-height:1.55; margin-bottom:8px; }

  .own-sub { font-size:15px; color:var(--mut); line-height:1.55; margin-bottom:16px; }
  .own-row { display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap; }
  .ownin { flex:1; min-width:120px; background:#0d141c; border:1px solid var(--line); color:var(--fg); border-radius:10px; padding:16px; font-family:'IBM Plex Mono',monospace; font-size:28px; text-align:center; letter-spacing:.3em; }
  .own-btn { background:var(--signal); border:none; color:#04110f; font-weight:700; font-size:17px; padding:16px 28px; border-radius:10px; cursor:pointer; font-family:inherit; min-height:60px; }
  .own-btn:disabled { opacity:.4; cursor:not-allowed; }
  .own-out { background:#0d141c; border:1px solid var(--line); border-radius:12px; padding:16px 18px; margin-bottom:14px; }
  .own-kind { font-size:17px; margin-bottom:12px; } .own-kind b { color:var(--due); }
  .own-odds { display:flex; flex-direction:column; gap:8px; margin-bottom:12px; }
  .oo { display:grid; grid-template-columns:1.3fr auto; gap:2px 10px; padding:10px 12px; background:#141b25; border:1px solid var(--line); border-radius:8px; }
  .oo.best { border-color:var(--hot); }
  .oo-t { font-weight:600; font-size:15px; } .oo-o { font-family:'IBM Plex Mono',monospace; font-size:16px; color:var(--hot); text-align:right; }
  .oo-n { grid-column:1 / -1; font-size:12.5px; color:var(--mut); }
  .own-combos { font-size:14px; color:var(--mut); display:flex; flex-wrap:wrap; gap:6px; align-items:center; }
  .check-banner { border-radius:12px; padding:16px 18px; margin-bottom:14px; font-size:16px; line-height:1.5; font-weight:500; }
  .check-banner.win-big { background:rgba(55,217,196,.15); border:1px solid var(--hot); color:var(--hot); }
  .check-banner.win-box { background:rgba(139,147,255,.15); border:1px solid var(--due); color:#c3c8ff; }
  .check-banner.no-win { background:#0d141c; border:1px solid var(--line); color:var(--mut); }
  .own-honest { font-size:14px; color:var(--mut); line-height:1.6; } .own-honest b { color:var(--fg); } .own-honest a { color:var(--signal); }

  /* ---- BOOMER-FRIENDLY / MOBILE PASS: larger type, big touch targets ---- */
  .lab { font-size:17px; }
  .tag { font-size:17px; }
  .step { font-size:13px; }
  .big-step { font-size:20px; }
  .rn { min-width:48px; height:48px; font-size:26px; }
  .sc { font-size:16px; padding:14px 10px; min-height:52px; }
  .mood-lab { font-size:13px; }
  .mood-nums { font-size:30px; }
  .mood-sub { font-size:12px; }
  .mythbust { font-size:14px; color:var(--mut); line-height:1.55; margin:4px 0 16px; }
  .mythbust b { color:var(--cold); }
  .chartwrap summary { font-size:15px; padding:6px 0; }
  .freq-n { font-size:14px; }
  .chart-note { font-size:14px; }
  .recent-lab { font-size:14px; }
  .chip-num { font-size:16px; padding:6px 11px; }
  .rollbtn { font-size:21px; padding:20px 40px; min-height:64px; width:100%; max-width:360px; }
  .why-h, .box-h { font-size:15px; }
  .why li { font-size:16px; }
  .box-tag { font-size:15px; }
  .box-row { font-size:15px; grid-template-columns:1.5fr 1fr; grid-auto-rows:auto; }
  .box-row .bp { grid-column:1 / -1; margin-top:-2px; }
  .combo { font-size:15px; padding:5px 10px; }
  .box-note { font-size:14px; line-height:1.6; }
  .fairnote { font-size:15px; }
  .adder-row input, .adder-row select { font-size:16px; padding:14px 14px; min-height:52px; }
  .numin { width:96px; font-size:20px; }
  .add { font-size:16px; padding:14px 24px; min-height:52px; }
  .datalink { font-size:15px; padding:8px 0; }
  .foot { font-size:13px; }

  @media (max-width:560px) {
    .lab { padding:14px; }
    h1 { font-size:44px; }
    .scope { flex-direction:column; }
    .sc { width:100%; min-width:0; }
    .moodgrid { grid-template-columns:1fr; }
    .mood { flex-direction:row; justify-content:space-between; align-items:center; text-align:left; padding:16px; gap:12px; }
    .mood > span:first-child { flex:0 0 auto; }
    .mood-nums { flex:1 1 auto; text-align:right; font-size:26px; letter-spacing:.02em; }
    .mood-nums { font-size:28px; }
    .mood > span:first-child { order:0; } 
    .bignum { font-size:clamp(72px,26vw,120px); }
    .box-row { grid-template-columns:1fr auto; }
    .box-row .bp { grid-column:1 / -1; }
    .adder-row { flex-direction:column; align-items:stretch; }
    .fresh-row { flex-direction:column; }
    .bet-inputs { flex-direction:column; align-items:stretch; }
    .bet-field { width:100%; } .bnum, .bamt { width:100%; }
    .bet-add { width:100%; }
    .re-row { grid-template-columns:auto auto 1fr auto; }
    .led-row { grid-template-columns:1fr auto auto auto; }
    .led-date { grid-column:1 / -1; }
    .fresh-row select, .big-add, .fresh-row .numin { width:100%; }
    .adder-row input, .adder-row select, .numin, .add { width:100%; }
  }
`;
